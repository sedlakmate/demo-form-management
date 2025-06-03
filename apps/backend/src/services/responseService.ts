import { PrismaClient, Response, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateResponseInput = Prisma.ResponseCreateInput;
export type UpdateResponseInput = Prisma.ResponseUpdateInput;

export async function createResponse(
  data: CreateResponseInput,
): Promise<Response> {
  return prisma.response.create({ data });
}

export async function getResponseById(id: string): Promise<Response | null> {
  return prisma.response.findUnique({ where: { id } });
}

export async function updateResponse(
  id: string,
  data: UpdateResponseInput,
): Promise<Response> {
  return prisma.response.update({ where: { id }, data });
}

export async function deleteResponse(id: string): Promise<Response> {
  return prisma.response.delete({ where: { id } });
}

export async function listResponsesByForm(formId: string): Promise<Response[]> {
  // Find all fields belonging to sections of the given form
  const fields = await prisma.field.findMany({
    where: {
      section: {
        formId,
      },
    },
    select: { id: true },
  });
  const fieldIds = fields.map((f) => f.id);
  if (fieldIds.length === 0) return [];
  return prisma.response.findMany({
    where: { fieldId: { in: fieldIds } },
  });
}

export async function createResponseForFormToken(
  token: string,
  data: CreateResponseInput,
): Promise<Response> {
  // Get the form and its sections/fields
  const form = await prisma.form.findUniqueOrThrow({
    where: { token },
    include: {
      sections: {
        include: { fields: true },
      },
    },
  });
  // Collect all field IDs for this form
  const allowedFieldIds = form.sections.flatMap((section) =>
    section.fields.map((field) => field.id),
  );
  // Only allow if the fieldId is part of the form
  const fieldId = data.field?.connect?.id;
  if (!fieldId || !allowedFieldIds.includes(fieldId)) {
    throw new Error("Field does not belong to this form.");
  }
  return createResponse(data);
}
