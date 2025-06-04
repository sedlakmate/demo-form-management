import { PrismaClient, Response, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateResponseInput = Prisma.ResponseCreateInput;

export async function createResponse(
  data: CreateResponseInput,
): Promise<Response> {
  return prisma.response.create({ data });
}

export async function getResponseById(id: string): Promise<Response | null> {
  return prisma.response.findUnique({ where: { id } });
}

export async function deleteResponse(id: string): Promise<Response> {
  return prisma.response.delete({ where: { id } });
}

export async function createResponseForFormToken(
  token: string,
  data: Record<string, string>,
): Promise<Response[]> {
  const form = await prisma.form.findUniqueOrThrow({
    where: { token },
    include: {
      sections: {
        include: { fields: true },
      },
    },
  });

  const allowedFieldIds = form.sections.flatMap((section) =>
    section.fields.map((field) => field.id),
  );

  const submittedFieldIds = Object.keys(data);
  for (const fieldId of submittedFieldIds) {
    if (!allowedFieldIds.includes(fieldId)) {
      throw new Error(`Field does not belong to this form: ${fieldId}`);
    }
  }

  const responses = await Promise.all(
    submittedFieldIds.map((fieldId) =>
      prisma.response.create({
        data: {
          field: { connect: { id: fieldId } },
          value: data[fieldId],
        },
      }),
    ),
  );
  return responses;
}
