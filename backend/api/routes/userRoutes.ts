import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../../controllers/userController";
import { authMiddleware } from "../../middleware/authMiddleware";
import upload from "../../middleware/upload";

export const userRouter = Router();

userRouter.get("/about", getUser);
userRouter.post(
  "/about",
  authMiddleware,
  upload.single("profileImage"),
  createUser
);
userRouter.put("/about/:id", upload.single("profileImage"), updateUser);
