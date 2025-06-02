import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      bio,
      skills,
      socials,
      phoneNumber,
    } = req.body;

    const imageUrl = req.file ? req.file.path : "";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      bio,
      profileImage: imageUrl,
      skills,
      socials,
      phoneNumber,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? req.file.path : "";

    const user = await User.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      bio: req.body.bio,
      profileImage: imageUrl,
      skills: req.body.skills,
      socials: req.body.socials,
      phoneNumber: req.body.phoneNumber,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const updatedUserInformation = await User.findById(id);
    res
      .status(201)
      .json({ message: "User updated successfully", updatedUserInformation });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error has occurred" });
    }
  }
};
