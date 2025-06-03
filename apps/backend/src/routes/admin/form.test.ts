import request from "supertest";
import { createServer } from "../../server";
import { PrismaClient } from "@prisma/client";

const app = createServer();
const prisma = new PrismaClient();

describe("Admin Form API", () => {
  beforeEach(async () => {
    // Clean DB and seed a form
    await prisma.response.deleteMany();
    await prisma.response.deleteMany();
    await prisma.field.deleteMany();
    await prisma.section.deleteMany();
    await prisma.form.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new form", async () => {
    const res = await request(app)
      .post("/admin/form")
      .send({
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
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.sections.length).toBeGreaterThan(0);
    expect(res.body.sections[0].fields.length).toBeGreaterThan(0);
  });

  it("should list forms", async () => {
    // Seed a form
    await prisma.form.create({
      data: {
        title: "Test Form",
        sections: { create: [] },
      },
    });
    const res = await request(app).get("/admin/form");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a form by id", async () => {
    const form = await prisma.form.create({
      data: {
        title: "Test Form",
        sections: { create: [] },
      },
    });
    const res = await request(app).get(`/admin/form/${form.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", form.id);
  });

  it("should update a form", async () => {
    const form = await prisma.form.create({
      data: {
        title: "Test Form",
        sections: { create: [] },
      },
    });
    const res = await request(app)
      .put(`/admin/form/${form.id}`)
      .send({ title: "Updated Title" });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });

  it("should delete a form", async () => {
    const form = await prisma.form.create({
      data: {
        title: "Test Form",
        sections: { create: [] },
      },
    });
    const res = await request(app).delete(`/admin/form/${form.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(form.id);
  });
});
