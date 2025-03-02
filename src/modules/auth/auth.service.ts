import bcrypt from "bcrypt";
import { Resend, CreateEmailResponse } from "resend";
import env from "../../config/env";
import { emailTemplate } from "../../utils/emailTemplate.render";
import { SprintifyVerificationEmail } from "../../email/VerifyEmail";
import jwt from "jsonwebtoken";
import axios, { isAxiosError } from "axios";
import { NextFunction } from "express";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const checkIsPasswordCorrect = async (
  hashPassword: string,
  plainPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const generateJWT = (
  tokenSignature: {
    [key: string]: string | number;
  },
  jwtSecret: string
): string => {
  return jwt.sign({ ...tokenSignature }, jwtSecret, { expiresIn: "1d" });
};

export const verifyJWT = (token: string): string | object => {
  let jwtSecret: string = env.JWT_EMAIL_SECRET as string;
  return jwt.verify(token, jwtSecret);
};

export const sendVerificationEmail = async (
  email: string,
  name: string
): Promise<CreateEmailResponse> => {
  const resend = new Resend(env.RESEND_KEY);
  const token = generateJWT({ email }, env.JWT_EMAIL_SECRET);

  const verificationURL = `${env.BACKEND_URL}/api/v1/auth/verify-email?token=${token}`;

  return await resend.emails.send({
    from: "Sprintify Team <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your email",
    html: await emailTemplate(SprintifyVerificationEmail, {
      verificationUrl: verificationURL,
      userEmail: email,
      username: name,
    }),
  });
};

export const getGoogleUser = async (token: string, next: NextFunction) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      next(
        err?.response?.data || {
          message: "Invalid Token, Access denied.",
          statusCode: 401,
        }
      );
    }
  }
};
