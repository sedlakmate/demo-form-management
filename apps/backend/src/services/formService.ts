import { PrismaClient, Prisma, Form } from "@prisma/client";

const prisma = new PrismaClient();

export type CreateFormInput = Prisma.FormCreateInput;
export type UpdateFormInput = Prisma.FormUpdateInput;

export type FormWithSectionsAndToken = Prisma.FormGetPayload<{
  include: {
    sections: {
      include: {
        fields: true;
      };
    };
    token: true;
  };
}>;

export async function createForm(data: CreateFormInput): Promise<Form> {
  return prisma.form.create({ data });
}

export async function getFormById(
  id: string,
): Promise<FormWithSectionsAndToken> {
  return prisma.form.findUniqueOrThrow({
    where: { id },
    include: {
      sections: {
        include: {
          fields: true,
        },
      },
      token: true,
    },
  });
}

export async function updateForm(
  id: string,
  data: UpdateFormInput,
): Promise<Form> {
  return prisma.form.update({
    where: { id },
    data,
  });
}

export async function deleteForm(id: string): Promise<Form> {
  return prisma.form.delete({ where: { id } });
}

export async function listForms(): Promise<FormWithSectionsAndToken[]> {
  return prisma.form.findMany({
    include: {
      sections: {
        include: {
          fields: true,
        },
      },
      token: true,
    },
  });
}
