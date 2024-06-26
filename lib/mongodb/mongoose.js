import mongoose from "mongoose";

let isConnected = false; //! Temporary - mongoose.connections[0].readyState

const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "meetzone",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
