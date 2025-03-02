import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  organizations: string[];
  isVerified: boolean;
  avatar?: string;
  authMethod: "local" | "google";
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authMethod === "local";
      },
    },
    organizations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    authMethod: {
      type: String,
      default: "local",
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
