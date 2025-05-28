import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../../controllers/userController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const userRouter = Router();

userRouter.get("/about", getUser);
userRouter.post("/about", authMiddleware, createUser);
userRouter.put("/about/:id", updateUser);
