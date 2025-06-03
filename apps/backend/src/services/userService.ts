import { PrismaClient, User, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;

export async function createUser(data: CreateUserInput): Promise<User> {
  return prisma.user.create({ data });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function updateUser(
  id: string,
  data: UpdateUserInput,
): Promise<User> {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

export async function listUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
