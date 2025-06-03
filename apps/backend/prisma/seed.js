const { PrismaClient } = require("@prisma/client");
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Prisma...");

  const password = await bcrypt.hash("admin123", 10);

  console.log("Upserting admin user...");
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      name: "Admin",
      password,
      role: "ADMIN",
    },
    create: {
      name: "Admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });
  console.log("Admin user upserted:", adminUser);

  console.log("Creating example form...");
  const form = await prisma.form.create({
    data: {
      title: "Example Form",
      sections: {
        create: [
          {
            title: "Personal Info",
            order: 1,
            fields: {
              create: [
                {
                  label: "First Name",
                  type: "TEXT",
                  required: true,
                  order: 1,
                  default: "",
                },
                {
                  label: "Age",
                  type: "NUMBER",
                  required: false,
                  order: 2,
                  default: null,
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log("Example form created:", form);

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
