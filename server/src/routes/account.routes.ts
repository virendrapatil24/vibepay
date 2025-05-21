import { Router } from "express";
import { isAuthenticated } from "../auth/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import * as accountController from "../controllers/account.controller";

const accountRouter = Router();

//get balance
accountRouter.get(
  "/balance",
  isAuthenticated,
  asyncHandler(accountController.getAccountBalance)
);

//send money
accountRouter.post(
  "/send",
  isAuthenticated,
  asyncHandler(accountController.sendMoney)
);

export default accountRouter;
