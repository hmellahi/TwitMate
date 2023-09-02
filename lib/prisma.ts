// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// const prismaInstance = new PrismaClient({ log: ["query"] });

// export const prisma = globalForPrisma.prisma || prismaInstance;

// if (process.env.NODE_ENV != "production") globalForPrisma.prisma;

// import { PrismaClient } from "@prisma/client"

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  prisma = globalForPrisma.prisma;
}
// console.log(prisma)

export { prisma };
