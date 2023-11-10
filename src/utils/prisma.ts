import { PrismaClient } from "@prisma/client";

const prismaDB = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "DEV") {
  global.prisma = prismaDB;
}

export default prismaDB;
