import { PrismaClient } from "@prisma/client";

declare global {
  // priisma
  var prisma: typeof PrismaClient;

  namespace Lucia {
    type Auth = import("./src/utils/lucia.js").AuthHandler;
    type DatabaseUserAttributes = {
      email: string;
      username: string;
    };
    type DatabaseSessionAttributes = {};
  }

  namespace Express {
    interface Request {
      userInfo?: {
        userId?:string,
        sessionId?:string
      };
    }
  }
}

export {};
