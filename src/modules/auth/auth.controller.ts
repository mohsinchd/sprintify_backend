import { asyncHandler } from "../../middlewares/async.middleware";
import { GoogleLogin, RegisterUser } from "../../validations/auth.validations";
import { IUser, User } from "./auth.model";
import { Request, Response, NextFunction } from "express";
import {
  checkIsPasswordCorrect,
  generateJWT,
  getGoogleUser,
  hashPassword,
  sendVerificationEmail,
  verifyJWT,
} from "./auth.service";
import env from "../../config/env";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: RegisterUser = req.body;

    const userExists = await User.findOne<IUser>({ email });

    if (userExists) {
      if (userExists.authMethod === "google")
        return next({
          message:
            "This email is registered with Google. Please login with Google",
          statusCode: 400,
        });
      return next({ message: "User already exists", statusCode: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user: IUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const { data, error } = await sendVerificationEmail(user.email, user.name);

    if (error)
      return next({
        message: "Error sending verification email",
        statusCode: 500,
      });

    res.status(201).json({
      success: true,
      message: "Registered successfully. Please verify your email.",
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: RegisterUser = req.body;

    const user = await User.findOne<IUser>({ email });

    if (!user) return next({ message: "Invalid credentials", statusCode: 400 });

    if (user.authMethod === "google")
      return next({
        message:
          "This user is registered with Google. Please login with Google",
        statusCode: 400,
      });

    const isPasswordCorrect = await checkIsPasswordCorrect(
      user.password as string,
      password
    );

    if (!isPasswordCorrect)
      return next({ message: "Invalid credentials", statusCode: 400 });

    if (!user.isVerified)
      return next({ message: "Please verify your email", statusCode: 401 });

    const token = generateJWT({ id: user._id as string }, env.JWT_AUTH_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .json({ success: true, message: "Logged in successfully" });
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;

    if (!token) return next({ message: "Invalid token", statusCode: 400 });

    const { email } = verifyJWT(token as string) as { email: string };

    const user = await User.findOne<IUser>({ email });
    if (!user) return next({ message: "User not found", statusCode: 404 });
    user.isVerified = true;

    await user.save();

    res.status(200).json({ success: true, message: "Email verified" });
  }
);

export const googleLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token }: GoogleLogin = req.body;

    const googleUser = await getGoogleUser(token, next);

    let user = await User.findOne<IUser>({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        isVerified: true,
        avatar: googleUser.picture,
        authMethod: "google",
      });
    } else if (user.authMethod === "local") {
      user.authMethod = "google";
      user.isVerified = true;
      if (googleUser.picture && !user.avatar) {
        user.avatar = googleUser.picture;
      }
      await user.save();
    }

    const authToken = generateJWT(
      { id: user?._id as string },
      env.JWT_AUTH_SECRET
    );

    res
      .status(200)
      .cookie("token", authToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .json({ success: true, message: "Logged in successfully" });
  }
);
