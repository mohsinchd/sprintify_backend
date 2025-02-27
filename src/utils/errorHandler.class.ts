import { z } from "zod";

export class ErrorHandler extends Error {
  statusCode: number;
  errors: z.ZodError;

  constructor(statusCode: number, errors: z.ZodError) {
    super("Validation Error");
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
