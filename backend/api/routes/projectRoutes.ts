import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../../controllers/projectsController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const projectRouter = Router();

projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", getProjectById);
projectRouter.post("/projects", createProject);
projectRouter.put("/projects/:id", updateProject);
projectRouter.delete("/projects/:id", deleteProject);
