import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyEmail,
  googleLogin,
} from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import {
  registerUserSchema,
  loginUserSchema,
  googleLoginSchema,
} from "../../validations/auth.validations";

const authRoutes = Router();

authRoutes.route("/register").post(validate(registerUserSchema), registerUser);
authRoutes.route("/login").post(validate(loginUserSchema), loginUser);
authRoutes.route("/verify-email").get(verifyEmail);
authRoutes
  .route("/google-login")
  .post(validate(googleLoginSchema), googleLogin);

export default authRoutes;
