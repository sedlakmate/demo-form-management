const { PrismaClient } = require("@prisma/client");
const { randomUUID } = require("crypto");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });

  await prisma.form.create({
    data: {
      title: "Example Form",
      token: {
        create: {
          value: randomUUID(),
        },
      },
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

