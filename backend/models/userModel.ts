import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    bio: { type: String },
    profileImage: { type: String },
    skills: { type: [String] },
    socials: { type: Object },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<InferSchemaType<typeof UserSchema>>(
  "User",
  UserSchema
);
