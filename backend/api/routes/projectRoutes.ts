import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../../controllers/projectsController";
import { authMiddleware } from "../../middleware/authMiddleware";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const projectRouter = Router();

projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", getProjectById);
projectRouter.post("/projects", upload.single("image"), createProject);
projectRouter.put("/projects/:id", upload.single("image"), updateProject);
projectRouter.delete("/projects/:id", deleteProject);
