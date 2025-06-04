import { json, urlencoded } from "body-parser";
import express, { type Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import adminAuthRouter from "./routes/admin/auth";
import adminFormRouter from "./routes/admin/form";
import publicFormRouter from "./routes/public/form";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api/admin/auth", adminAuthRouter)
    .use("/admin/form", adminFormRouter)
    .use("/public/form", publicFormRouter)
    .get("/status", (req: Request, res: Response) => {
      res.json({ ok: true });
    });

  // Global error handler to always return JSON
  app.use((err: any, req: Request, res: Response, next: Function) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Server Error" });
  });

  return app;
};
