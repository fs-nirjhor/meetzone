import User from "@lib/models/User";
import connectToDb from "@lib/mongodb/mongoose";

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  username,
  email_addresses,
  img_url,
}) => {
  try {
    await connectToDb();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: clerkId,
          firstname: first_name,
          lastname: last_name,
          username: username,
          email: email_addresses[0].email_address,
          profilePhoto: img_url,
        },
      },
      { upsert: true, new: true } // create if not exists
    );
    return user;
  } catch (error) {
    console.error(error.message);
  }
};
