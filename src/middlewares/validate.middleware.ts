import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { ErrorHandler } from "../utils/errorHandler.class";

export const validate = (schema: z.ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      (req as any).body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ErrorHandler(400, error));
      } else {
        next(error);
      }
    }
  };
};
