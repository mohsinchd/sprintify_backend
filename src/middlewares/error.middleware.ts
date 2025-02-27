import { ErrorRequestHandler } from "express";
import { ErrorHandler } from "../utils/errorHandler.class";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      success: false,
      errors: err.errors.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
