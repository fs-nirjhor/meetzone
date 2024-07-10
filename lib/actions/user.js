"use server";

import Post from "@lib/models/Post";
import User from "@lib/models/User";
import connectToDb from "@lib/mongodb/mongoose";

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  username,
  email_addresses,
  image_url,
}) => {
  try {
    await connectToDb();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: id,
          firstName: first_name,
          lastName: last_name,
          username: username,
          email: email_addresses[0].email_address,
          profilePhoto: image_url,
        },
      },
      { upsert: true, new: true } // create if not exists
    );
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.findOneAndDelete({ clerkId: id });
    await User.updateMany({following: user._id}, {$pull: {following: user._id}});
    await User.updateMany({followers: user._id}, {$pull: {followers: user._id}});
    await Post.deleteMany({creator: user._id});
    await Post.updateMany({likes: user._id}, {$pull: {likes: user._id}})
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.findOne({ clerkId: id })
    .populate("followers following")
    .populate({
      path: "posts savedPosts likedPosts",
      model: Post,
      populate: { path: "creator", model: User },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const getAllUser = async () => {
  try {
    await connectToDb();
    const user = await User.find()
    .populate("followers following")
    .populate({
      path: "posts savedPosts likedPosts",
      model: Post,
      populate: { path: "creator", model: User },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getSearchedUser = async (query) => {
  try {
    await connectToDb();
    const user = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    }).populate("followers following posts savedPosts likedPosts");
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};


export const followOrUnfollowUser = async (userId, followId) => {
  try {
    await connectToDb();

    const followingUser = await User.findById(userId);
    const followedUser = await User.findById(followId);

    if (!followingUser || !followedUser) {
      throw new Error("User not found");
    } else {
      const isFollowed = followingUser.following.includes(followId);

      if (isFollowed) {
        followingUser.following.pull(followId)
        followedUser.followers.pull(userId);
      } else {
        followingUser.following.push(followId)
        followedUser.followers.push(userId);
      }

      await followedUser.save();
      await followingUser.save();
    }
    return followingUser;
  } catch (error) {
    console.error(error.status, error.code);
    throw error;
  }
};

