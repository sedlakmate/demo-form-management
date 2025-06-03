import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";

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
