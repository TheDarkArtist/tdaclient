import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
    log: ['error']
});

if (process.env.VERCEL_ENV === "development") global.prisma = prisma;

export default prisma;



