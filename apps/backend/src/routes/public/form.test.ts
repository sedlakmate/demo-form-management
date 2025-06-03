import request from "supertest";
import { createServer } from "../../server";
import { Form, PrismaClient } from "@prisma/client";

const app = createServer();

const prisma = new PrismaClient();

describe("Public Form API", () => {
  let form: Form;

  beforeEach(async () => {
    // Clean DB and seed a form with a token
    await prisma.response.deleteMany();
    await prisma.response.deleteMany();
    await prisma.field.deleteMany();
    await prisma.section.deleteMany();
    await prisma.form.deleteMany();
    form = await prisma.form.create({
      data: {
        title: "Public Test Form",
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
      },
      include: { sections: { include: { fields: true } } },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should get a public form by token", async () => {
    const res = await request(app).get(`/public/form/${form.token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", form.id);
    expect(res.body.sections.length).toBeGreaterThan(0);
  });

  it("should return 404 for invalid token", async () => {
    const res = await request(app).get(`/public/form/invalid-token`);
    expect(res.status).toBe(404);
  });

  it("should submit a public form by token", async () => {
    const field = await prisma.field.findFirst({
      where: { section: { formId: form.id } },
    });
    if (!field) throw new Error("No field found for seeded form");
    const res = await request(app)
      .post(`/public/form/${form.token}/submit`)
      .send({
        responses: [
          {
            field: { connect: { id: field.id } },
            value: "Test Response",
          },
        ],
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("response");
  });
});
