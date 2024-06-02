import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    savedPosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    likedPosts: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

const User = models?.User || model("User", userSchema);

export default User;
