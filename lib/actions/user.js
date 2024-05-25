import User from "@lib/models/User";
import connectToDb from "@lib/mongodb/mongoose";
import { toast } from "react-toastify";

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
          firstname: first_name,
          lastname: last_name,
          username: username,
          email: email_addresses[0].email_address,
          profilePhoto: image_url,
        },
      },
      { upsert: true, new: true } // create if not exists
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.findOneAndDelete({ clerkId: id });
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.findOne({ clerkId: id }).populate(
      "followers following" // posts savedPosts likedPosts
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
