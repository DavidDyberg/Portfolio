import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../../controllers/projectsController";
import { authMiddleware } from "../../middleware/authMiddleware";
import upload from "../../middleware/upload";

export const projectRouter = Router();

projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", getProjectById);
projectRouter.post("/projects", upload.single("image"), createProject);
projectRouter.put("/projects/:id", upload.single("image"), updateProject);
projectRouter.delete("/projects/:id", deleteProject);
