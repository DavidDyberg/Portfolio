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

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      bio,
      profileImage,
      skills,
      socials,
      phoneNumber,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      bio,
      profileImage,
      skills,
      socials,
      phoneNumber,
    });

    await newUser.save();
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
    const user = await User.findByIdAndUpdate(id, req.body);

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
