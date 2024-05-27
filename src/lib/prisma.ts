import { PrismaClient } from "@prisma/client";

// Declare a global variable for PrismaClient to avoid multiple instances in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize PrismaClient and set logging level to 'error' to capture errors
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error"],
  });

// In development, ensure PrismaClient instance is not recreated
if (process.env.VERCEL_ENV === "development") global.prisma = prisma;

export default prisma;
