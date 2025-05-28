import { Router } from "express";
import { login } from "../../controllers/loginController";

export const authRouter = Router();

authRouter.post("/login", login);
