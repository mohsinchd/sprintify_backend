import mongoose from "mongoose";
import env from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};
