import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { isAuthenticated } from "../auth/auth.middleware";

const userRouter = Router();

//signup
userRouter.post("/signup", asyncHandler(userController.createUser));

//login
userRouter.post("/login", asyncHandler(userController.loginUser));

//update user
userRouter.put("/", isAuthenticated, asyncHandler(userController.updateUser));

export default userRouter;
