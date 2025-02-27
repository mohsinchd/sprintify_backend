import express, { Application } from "express";
import authRoutes from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Application = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app;
