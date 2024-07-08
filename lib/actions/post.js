import Post from "@lib/models/Post";
import User from "@lib/models/User";
import connectToDb from "@lib/mongodb/mongoose";

export const createPost = async (data) => {
  try {
    await connectToDb();
    //const { creator, caption, postPhoto, tag } = data;
    // create post
    const post = await Post.create(data);
    // add to users post list
    await User.findByIdAndUpdate(data.creator, { $push: { posts: post._id } });
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const updatePost = async (id, update) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndUpdate(id, { $set: update });
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const deletePost = async (id) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndDelete(id);
    // remove from users post list
    await User.findByIdAndUpdate(id, { $pull: { posts: id } });
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const getSinglePost = async (id) => {
  try {
    await connectToDb();
    const post = await Post.findById(id)
      .populate("creator likes")
      .lean()
      .exec();
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const getFeedPost = async () => {
  try {
    await connectToDb();
    const post = await Post.find().populate("creator likes").lean().exec();
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const getSearchedPosts = async (query) => {
  try {
    await connectToDb();
    const post = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    })
      .populate("creator likes")
      .lean()
      .exec();
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const getUserPosts = async (id) => {
  try {
    await connectToDb();
    const post = await Post.find({ clerkId: id })
      .populate("creator likes")
      .lean()
      .exec();
    return post;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};


export const likePost = async (postId, userId) => {
  try {
    await connectToDb();

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      console.log("Not found post or user");
      return;
    } else {
      const isLiked = post.likes.includes(userId);

      if (isLiked) {
        post.likes.pull(userId);
        user.likedPosts.pull(postId)
      } else {
        post.likes.push(userId);
        user.likedPosts.push(postId)
      }

      await post.save();
      await user.save();
    }
    // const user = await User.findByIdAndUpdate(userId, {
    //   $addToSet: { likedPosts: postId },
    // });
    return {user, post};
  } catch (error) {
    console.error(error.message);
    return error;
  }
};
