import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { RequestHandler } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "default_fallback";

export async function validateAdmin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN") return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "2h",
  });

  return token;
}

export function verifyToken(
  token: string,
): { sub: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      typeof decoded.sub === "string" &&
      typeof decoded.role === "string"
    ) {
      return { sub: decoded.sub, role: decoded.role };
    }
    return null;
  } catch {
    return null;
  }
}

export const requireAdminAuth: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  const payload = verifyToken(token);
  if (!payload || payload.role !== "ADMIN") {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).user = payload;
  next();
  return;
};
