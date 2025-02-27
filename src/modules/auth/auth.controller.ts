import { asyncHandler } from "../../middlewares/async.middleware";
import { IUser, User } from "./auth.model";
import { Request, Response, NextFunction } from "express";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
    });
  }
);
