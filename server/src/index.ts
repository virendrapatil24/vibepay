import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || "";

    if (!mongoURI) {
      throw new Error("MongoDB connection string is not defined in .env");
    }

    await mongoose.connect(mongoURI);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(Number(PORT), "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
