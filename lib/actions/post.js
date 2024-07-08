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
    throw error;
  }
};

export const updatePost = async (id, update) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndUpdate(id, { $set: update });
    return post;
  } catch (error) {
    console.error(error.message);
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const getFeedPost = async () => {
  try {
    await connectToDb();
    const post = await Post.find().populate("creator likes").lean().exec();
    return post;
  } catch (error) {
    console.error(error.message);
    throw error;
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
    throw error;
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
    throw error;
  }
};


export const likeOrUnlikePost = async (postId, userId) => {
  try {
    await connectToDb();

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      throw new Error("Not found post or user");
    } else {
      const isLiked = user.likedPosts.includes(postId);

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
    return post;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const saveOrUnsavePost = async (postId, userId) => {
  try {
    await connectToDb();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User Not Found");
    } else {
      const isSaved = user.savedPosts.includes(postId);

      if (isSaved) {
        user.savedPosts.pull(postId)
      } else {
        user.savedPosts.push(postId)
      }

      await user.save();
    }
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
