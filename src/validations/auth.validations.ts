import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be consists of 3 characters")
    .max(50, "Name is should not be longer then 50 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be of atleast 8 characters"),
});

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be of atleast 8 characters"),
});

export const googleLoginSchema = z.object({
  token: z.string({ required_error: "Google Token is required" }),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type GoogleLogin = z.infer<typeof googleLoginSchema>;
