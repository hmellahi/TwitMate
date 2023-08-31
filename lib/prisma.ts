import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prismaInstance = new PrismaClient({ log: ["query"] });

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;
