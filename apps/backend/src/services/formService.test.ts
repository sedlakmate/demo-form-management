import { PrismaClient } from "@prisma/client";
import * as formService from "./formService";

const prisma = new PrismaClient();

// Helper to seed a form for tests
async function seedForm() {
  return formService.createForm({
    title: "Test Form",
    token: {
      create: { value: "test-token" },
    },
    sections: {
      create: [
        {
          title: "Section 1",
          order: 1,
          fields: {
            create: [
              {
                label: "Field 1",
                type: "TEXT",
                required: true,
                order: 1,
                default: "",
              },
            ],
          },
        },
      ],
    },
  });
}

describe("formService", () => {
  let seededFormId: string;

  beforeEach(async () => {
    // Clean up all tables before each test for isolation
    await prisma.response.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.field.deleteMany();
    await prisma.section.deleteMany();
    await prisma.form.deleteMany();
    await prisma.token.deleteMany();

    const seededForm = await seedForm();
    seededFormId = seededForm.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a form", async () => {
    // Clean DB
    await prisma.response.deleteMany();
    await prisma.submission.deleteMany();
    await prisma.field.deleteMany();
    await prisma.section.deleteMany();
    await prisma.form.deleteMany();
    await prisma.token.deleteMany();

    const form = await formService.createForm({
      title: "Another Test Form",
      token: {
        create: { value: "another-test-token" },
      },
      sections: {
        create: [
          {
            title: "Section 1",
            order: 1,
            fields: {
              create: [
                {
                  label: "Field 1",
                  type: "TEXT",
                  required: true,
                  order: 1,
                  default: "",
                },
              ],
            },
          },
        ],
      },
    });
    expect(form).toHaveProperty("id");
  });

  it("should get a form by id with sections and token", async () => {
    const form = await formService.getFormById(seededFormId);
    expect(form).toHaveProperty("id", seededFormId);
    expect(form.sections.length).toBeGreaterThan(0);
    expect(form.token).toBeDefined();
  });

  it("should update a form", async () => {
    const updated = await formService.updateForm(seededFormId, {
      title: "Updated Title",
    });
    expect(updated.title).toBe("Updated Title");
  });

  it("should list forms", async () => {
    const forms = await formService.listForms();
    expect(Array.isArray(forms)).toBe(true);
    expect(forms.length).toBeGreaterThan(0);
  });

  it("should delete a form", async () => {
    const deleted = await formService.deleteForm(seededFormId);
    expect(deleted.id).toBe(seededFormId);
    // Should not find the form anymore
    await expect(formService.getFormById(seededFormId)).rejects.toThrow();
  });
});
