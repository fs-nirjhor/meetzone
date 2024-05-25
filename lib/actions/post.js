import Post from "@lib/models/Post";
import connectToDb from "@lib/mongodb/mongoose";
import { toast } from "react-toastify";

export const createPost = async (data) => {
  try {
    await connectToDb();
    //const { creator, caption, postPhoto, tag } = data;
    const post = await Post.create(data);
    return post;
  } catch (error) {
    toast.error(error.message);
  }
};
export const updatePost = async (id, update) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndUpdate(
      id,
      { $set: update },
      { upsert: true, new: true } // create if not exists
    );
    return post;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deletePost = async (id) => {
  try {
    await connectToDb();
    const post = await Post.findByIdAndDelete(id);
    return post;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getPost = async (id) => {
  try {
    await connectToDb();
    const post = await Post.findById(id)
      .populate("creator likes")
      .lean()
      .exec();
    return post;
  } catch (error) {
    toast.error(error.message);
  }
};
export const getAllPost = async () => {
  try {
    await connectToDb();
    const post = await Post.find().populate("creator likes").lean().exec();
    return post;
  } catch (error) {
    toast.error(error.message);
  }
};
