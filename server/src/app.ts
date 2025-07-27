import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.routes";
import cors from "cors";
import accountRouter from "./routes/account.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal server error" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Application is up and running." });
});

export default app;
