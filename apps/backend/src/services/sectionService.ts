import { PrismaClient, Prisma, Section } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateSectionInput = Prisma.SectionCreateInput;

export async function createSection(
  data: CreateSectionInput,
  fields: Array<Omit<Prisma.FieldCreateInput, "section">>,
  tx: Prisma.TransactionClient,
): Promise<Section> {
  if (!fields || fields.length === 0) {
    throw new Error("Each section must have at least one field.");
  }
  const section = await tx.section.create({ data });
  for (const fieldData of fields) {
    await tx.field.create({
      data: { ...fieldData, section: { connect: { id: section.id } } },
    });
  }
  return section;
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
