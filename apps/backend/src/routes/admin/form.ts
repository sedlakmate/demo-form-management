import express from "express";
import * as formService from "../../services/formService";
import { asyncHandler } from "../../lib/asyncHandler";
import { requireAdminAuth } from "../../lib/auth";

const router = express.Router();

router.use(requireAdminAuth);

// Create a new form
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const form = await formService.createForm(req.body);
    res.status(201).json(form);
  }),
);

// List all forms
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const forms = await formService.listForms();
    res.json(forms);
  }),
);

// Get a form by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const form = await formService.getFormById(req.params.id);
    res.json(form);
  }),
);

// Delete a form by token, only if it has no responses
router.delete(
  "/:token",
  asyncHandler(async (req, res) => {
    try {
      const form = await formService.deleteFormByToken(req.params.token);
      res.json(form);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({ error: err.message || "Failed to delete form" });
    }
  }),
);

export default router;
