import { PrismaClient, Prisma, Section } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateSectionInput = Prisma.SectionCreateInput;

export async function createSection(
  data: CreateSectionInput,
  tx: Prisma.TransactionClient,
): Promise<Section> {
  return tx.section.create({ data });
}

export async function getSectionById(id: string): Promise<Section | null> {
  return prisma.section.findUnique({ where: { id } });
}

export async function deleteSection(id: string): Promise<Section> {
  return prisma.section.delete({ where: { id } });
}

export async function listSectionsByForm(formId: string): Promise<Section[]> {
  return prisma.section.findMany({ where: { formId } });
}
