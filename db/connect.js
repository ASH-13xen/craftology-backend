import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // Load your .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop the app if DB fails
  }
};

export default connectDB;
