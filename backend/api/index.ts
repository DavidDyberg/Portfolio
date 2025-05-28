import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "../database/db";
import { userRouter } from "./routes/userRoutes";
import { projectRouter } from "./routes/projectRoutes";
import { authRouter } from "./routes/loginRoute";
import cors from "cors";

dotenv.config();
connectDB();

const app: Express = express();
const PORT: string | number = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/auth", authRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hejsan");
});

app.listen(PORT, () => {
  console.log(`[Server]: server is running on port http://localhost:${PORT}`);
});
