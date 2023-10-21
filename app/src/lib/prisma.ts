import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

const CustomPrismaClient = () => new PrismaClient();

if (process.env.NODE_ENV === "production") {
  prisma = CustomPrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = CustomPrismaClient();
  }

  prisma = globalForPrisma.prisma;
}

export { prisma };
