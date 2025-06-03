import { Form, Prisma, PrismaClient } from "@prisma/client";
import { createSection } from "./sectionService";
import { createField } from "./fieldService";

const prisma = new PrismaClient();

export type CreateFormWithSectionsInput = {
  title: string;
  sections: Array<{
    title: string;
    order: number;
    fields?: Array<{
      label: string;
      type: "TEXT" | "NUMBER";
      required: boolean;
      order: number;
      default?: string;
    }>;
  }>;
};

export type FormWithSections = Prisma.FormGetPayload<{
  include: {
    sections: {
      include: {
        fields: true;
      };
    };
  };
}>;

export async function createForm(
  data: CreateFormWithSectionsInput,
): Promise<FormWithSections> {
  try {
    return await prisma.$transaction(async (tx) => {
      const form = await tx.form.create({
        data: {
          title: data.title,
        },
      });
      for (const sectionData of data.sections) {
        const section = await createSection(
          {
            title: sectionData.title,
            order: sectionData.order,
            form: { connect: { id: form.id } },
          },
          tx,
        );
        if (sectionData.fields) {
          for (const fieldData of sectionData.fields) {
            await createField(
              {
                ...fieldData,
                section: { connect: { id: section.id } },
              },
              tx,
            );
          }
        }
      }
      return tx.form.findUniqueOrThrow({
        where: { id: form.id },
        include: {
          sections: {
            include: { fields: true },
          },
        },
      });
    });
  } catch (err) {
    console.error("Error in createForm:", err);
    throw err;
  }
}

export async function getFormById(id: string): Promise<FormWithSections> {
  return prisma.form.findUniqueOrThrow({
    where: { id },
    include: {
      sections: {
        include: {
          fields: true,
        },
      },
    },
  });
}

export async function getFormByToken(
  tokenId: string,
): Promise<FormWithSections> {
  return prisma.form.findUniqueOrThrow({
    where: { token: tokenId },
    include: {
      sections: {
        include: {
          fields: true,
        },
      },
    },
  });
}

export async function deleteForm(id: string): Promise<Form> {
  return prisma.form.delete({ where: { id } });
}

export async function listForms(): Promise<FormWithSections[]> {
  return prisma.form.findMany({
    include: {
      sections: {
        include: {
          fields: true,
        },
      },
    },
  });
}

export async function updateForm(
  id: string,
  data: Partial<{ title: string }>,
): Promise<FormWithSections> {
  await prisma.form.update({
    where: { id },
    data: {
      title: data.title,
    },
  });
  return getFormById(id);
}
