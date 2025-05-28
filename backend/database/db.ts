import mongoose from "mongoose";

async function connectDB() {
  try {
    const URL = process.env.MONGO_DB_URL_PROD || "";
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error while connecting to database: ${error.message}`);
    }
  }
}

export default connectDB;
