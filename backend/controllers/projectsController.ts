import { Request, Response } from "express";
import { Project } from "../models/projectsModel";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { limit, search } = req.query;

    let query = {};
    if (search) {
      query = { title: { $regex: search, $options: "i" } };
    }

    const projects = await Project.find(query).limit(Number(limit) || 0);
    res.json(projects);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res
      .status(201)
      .json({ message: "New project created successfully", project });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body);

    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findById(id);
    res.status(200).json({
      message: "The project was updated successfully",
      updatedProject,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project was deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};
