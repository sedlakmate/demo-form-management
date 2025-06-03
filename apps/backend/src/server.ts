import { json, urlencoded } from "body-parser";
import express, { type Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import adminAuthRouter from "./routes/admin/auth";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/admin/auth", adminAuthRouter)
    .get("/status", (req: Request, res: Response) => {
      res.json({ ok: true });
    });

  return app;
};
