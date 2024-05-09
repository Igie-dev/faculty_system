import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare const global: {
  prisma: PrismaClient;
};

let globalPrisma = global?.prisma as PrismaClient | undefined;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalPrisma) {
    globalPrisma = new PrismaClient();
  }
  prisma = globalPrisma;
}

export default prisma;
