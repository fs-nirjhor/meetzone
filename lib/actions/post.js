import Post from "@lib/models/Post";
import connectToDb from "@lib/mongodb/mongoose";

export const createPost = async (data) => {
  try {
    await connectToDb();
    //const { creator, caption, postPhoto, tag } = data;
    const post = await Post.create(data);
    return post;
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePost = async (id, update) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndUpdate(id, { $set: update });
    return post;
  } catch (error) {
    console.error(error.message);
  }
};

export const deletePost = async (id) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.error(error.message);
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
  }
};

export const getFeedPost = async () => {
  try {
    await connectToDb();
    const post = await Post.find().populate("creator likes").lean().exec();
    return post;
  } catch (error) {
    console.error(error.message);
  }
};
