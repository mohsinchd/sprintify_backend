import { Router } from "express";
import { registerUser } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { registerUserSchema } from "../../validations/auth.validations";

const authRoutes = Router();

authRoutes.route("/register").post(validate(registerUserSchema), registerUser);

export default authRoutes;
