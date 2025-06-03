import express from "express";
import * as formService from "../../services/formService";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();

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

// Update a form - INACTIVE FOR NOW
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const form = await formService.updateForm(req.params.id, req.body);
    res.json(form);
  }),
);

// Delete a form - INACTIVE FOR NOW
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const form = await formService.deleteForm(req.params.id);
    res.json(form);
  }),
);

export default router;
