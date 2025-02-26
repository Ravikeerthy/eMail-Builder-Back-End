import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;