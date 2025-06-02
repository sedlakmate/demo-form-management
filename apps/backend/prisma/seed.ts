import { prisma } from "../src/prisma";
import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";

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

  const form = await prisma.form.create({
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
                  default: "18",
                },
              ],
            },
          },
          {
            title: "Feedback",
            order: 2,
            fields: {
              create: [
                {
                  label: "Comment",
                  type: "TEXT",
                  required: false,
                  order: 1,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeded form:", form);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
