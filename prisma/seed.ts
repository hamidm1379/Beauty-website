import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      firstName: "مدیر",
      lastName: "سیستم",
      phone: "09120000000",
      email: "admin@glowshop.ir",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const customerPassword = await hash("123456", 12);

  const customer = await prisma.user.upsert({
    where: { phone: "09121111111" },
    update: {},
    create: {
      username: "customer",
      firstName: "کاربر",
      lastName: "تست",
      phone: "09121111111",
      email: "customer@test.com",
      password: customerPassword,
      role: "CUSTOMER",
      isActive: true,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  console.log("Seeded:", { admin: admin.id, customer: customer.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
