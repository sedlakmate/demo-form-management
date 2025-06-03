import express from "express";
import * as formService from "../../services/formService";
import * as responseService from "../../services/responseService";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();

// Get a public form by token
router.get(
  "/:token",
  asyncHandler(async (req, res) => {
    const token = req.params.token;
    if (!token) {
      res.status(404).json({ error: "Invalid or expired form link." });
      return;
    }
    try {
      // Find the form that references this token
      const form = await formService.getFormByToken(token);
      res.json(form);
    } catch (err) {
      res.status(404).json({ error: "Invalid form link." });
    }
  }),
);

// Submit a public form by token
router.post(
  "/:token/submit",
  asyncHandler(async (req, res) => {
    try {
      const response = await responseService.createResponseForFormToken(
        req.params.token,
        req.body.responses?.[0] || req.body.response,
      );
      res.status(201).json({ message: "Response received.", response });
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Submission failed." });
    }
  }),
);

export default router;
