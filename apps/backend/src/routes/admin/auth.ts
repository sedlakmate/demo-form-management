import { Request, Response, Router } from "express";
import { validateAdmin } from "../../lib/auth";
import { asyncHandler } from "../../lib/asyncHandler";

const router = Router();

router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const token = await validateAdmin(email, password);
    if (!token) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.json({ token });
  }),
);

export default router;

// Also export as /api/admin/auth/login for Next.js API proxy compatibility
module.exports = router;
