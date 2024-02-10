import mongoose from "mongoose";

const Connection = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database", error);
  }
};
export default Connection;
