import { PrismaClient } from "@prisma/client";
import * as formService from "./formService";

const prisma = new PrismaClient();

// Helper to seed a form for tests
async function seedForm() {
  return formService.createForm({
    title: "Test Form",
    sections: [
      {
        title: "Section 1",
        order: 1,
        fields: [
          {
            label: "Field 1",
            type: "TEXT",
            required: true,
            order: 1,
            default: "",
          },
        ],
      },
    ],
  });
}

describe("formService", () => {
  let seededFormId: string;

  beforeEach(async () => {
    await prisma.response.deleteMany();
    await prisma.field.deleteMany();
    await prisma.section.deleteMany();
    await prisma.form.deleteMany();

    const seededForm = await seedForm();
    seededFormId = seededForm.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a form", async () => {
    // Clean DB
    await prisma.response.deleteMany();
    await prisma.field.deleteMany();
    await prisma.section.deleteMany();
    await prisma.form.deleteMany();

    const form = await formService.createForm({
      title: "Another Test Form",
      sections: [
        {
          title: "Section 1",
          order: 1,
          fields: [
            {
              label: "Field 1",
              type: "TEXT",
              required: true,
              order: 1,
              default: "",
            },
          ],
        },
      ],
    });
    expect(form).toHaveProperty("id");
    expect(form.sections.length).toBeGreaterThan(0);
    expect(form.sections[0].fields.length).toBeGreaterThan(0);

    // Check DB for section
    const dbSections = await prisma.section.findMany({
      where: { formId: form.id },
    });
    expect(dbSections.length).toBe(1);
    expect(dbSections[0].title).toBe("Section 1");

    // Check DB for field
    const dbFields = await prisma.field.findMany({
      where: { sectionId: dbSections[0].id },
    });
    expect(dbFields.length).toBe(1);
    expect(dbFields[0].label).toBe("Field 1");
    expect(dbFields[0].type).toBe("TEXT");
    expect(dbFields[0].required).toBe(true);
    expect(dbFields[0].order).toBe(1);
    expect(dbFields[0].default).toBe("");
  });

  it("should get a form by id with sections and fields", async () => {
    const form = await formService.getFormById(seededFormId);
    expect(form).toHaveProperty("id", seededFormId);
    expect(form.sections.length).toBeGreaterThan(0);
    expect(form.sections[0].fields.length).toBeGreaterThan(0);
  });

  it("should list forms", async () => {
    const forms = await formService.listForms();
    expect(Array.isArray(forms)).toBe(true);
    expect(forms.length).toBeGreaterThan(0);
  });

  it("should delete a form", async () => {
    const deleted = await formService.deleteForm(seededFormId);
    expect(deleted.id).toBe(seededFormId);

    await expect(formService.getFormById(seededFormId)).rejects.toThrow();
  });
});
