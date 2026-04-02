import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
      throw new Error(
        "MONGO_URI is not set. Create a root .env file or add MONGO_URI to your environment before starting the API."
      );
    }

    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
