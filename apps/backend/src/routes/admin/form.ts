import { Router, Request, Response } from "express";
import { createForm } from "../../services/formService";
import { asyncHandler } from "../../lib/asyncHandler";

const router = Router();

router.post(
  "/",
  // TODO: add admin authentication middleware
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const form = await createForm(data);
    res.status(201).json(form);
  }),
);

export default router;
