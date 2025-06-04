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

  return app;
};
