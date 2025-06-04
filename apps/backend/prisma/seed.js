const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Prisma...");

  const password = await bcrypt.hash("admin123", 10);

  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(
      "Admin user already exists, skipping the rest of the seed process.",
    );
  } else {
    console.log("Creating admin user...");
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        name: "Admin",
        password,
        role: "ADMIN",
      },
      create: {
        name: "Admin",
        email: adminEmail,
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
            {
              title: "Contact Info",
              order: 2,
              fields: {
                create: [
                  {
                    label: "Email",
                    type: "TEXT",
                    required: true,
                    order: 1,
                    default: "",
                  },
                  {
                    label: "Phone",
                    type: "TEXT",
                    required: false,
                    order: 2,
                    default: "",
                  },
                ],
              },
            },
          ],
        },
      },
    });
    console.log("Example form created:", form);
  }

  console.log("Seeding ended.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
