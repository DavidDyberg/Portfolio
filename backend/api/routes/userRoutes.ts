import { Router } from "express";
import {
  createUser,
  getUser,
  getUserById,
  updateUser,
} from "../../controllers/userController";
import { authMiddleware } from "../../middleware/authMiddleware";
import upload from "../../middleware/upload";

export const userRouter = Router();

userRouter.get("/about", getUser);
userRouter.get("/about/:id", getUserById);
userRouter.post(
  "/about",
  authMiddleware,
  upload.single("profileImage"),
  createUser
);
userRouter.put("/about/:id", upload.single("profileImage"), updateUser);
