import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import cors from "cors";
import accountRouter from "./routes/account.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal server error" });
});

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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Application is up and running." });
});

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
