import { PrismaClient, Prisma, Field } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateFieldInput = Prisma.FieldCreateInput;

export async function createField(
  data: CreateFieldInput,
  tx: Prisma.TransactionClient,
): Promise<Field> {
  return tx.field.create({ data });
}

export async function getFieldById(id: string): Promise<Field | null> {
  return prisma.field.findUnique({ where: { id } });
}

export async function deleteField(id: string): Promise<Field> {
  return prisma.field.delete({ where: { id } });
}

export async function listFieldsBySection(sectionId: string): Promise<Field[]> {
  return prisma.field.findMany({ where: { sectionId } });
}
