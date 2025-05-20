import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";

const userRouter = Router();

//signup
userRouter.post("/signup", asyncHandler(userController.createUser));

//login
userRouter.post("/login", asyncHandler(userController.loginUser));

export default userRouter;
