import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is required");
    }

    const conn = await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully", conn.connection.host);
  } catch (error) {
    console.log("MongoDB Connection error : ", error.message);
    process.exit(1);
  }
};

export default connectDB;