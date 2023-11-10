import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
// import prismaDB from "./prisma.js";
import { PrismaClient } from "@prisma/client";
import { express } from "lucia/middleware";
import "lucia/polyfill/node";

const prismaDB = new PrismaClient();

export const authHandler = lucia({
  adapter: prisma(prismaDB),
  //   change for production later
  env: "DEV",
  middleware: express(),

  getUserAttributes: (DBuser) => {
    return {
      userId: DBuser.id,
      email: DBuser.email,
    };
  },
});

export type AuthHandler = typeof authHandler;
