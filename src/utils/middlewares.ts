import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { LuciaError } from "lucia";
import { ZodError } from "zod";
import { authHandler } from "./lucia.js";

interface errorObj {
  message: string | ZodError["formErrors"]["fieldErrors"];
  stack?: string;
  status?: number;
}

export function ErrorHandler(
  err: errorObj,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let msg = err.message;
  let stack = err.stack ?? msg;
  let statusCode = err.status ?? 500;

  // form schema error
  if (err instanceof ZodError) {
    const { formErrors } = err;

    msg = formErrors.fieldErrors;
    statusCode = 400;
  }

  // auth handler error
  if (err instanceof LuciaError) {
    msg = "Invalid auth id";
    statusCode = 401;
  }

  res.status(statusCode).json({ msg, stack });
}

export async function ValidateCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.headers["set-cookie"]);

  const authRequestHandler = authHandler.handleRequest(req, res);

  try {
    const session = await authRequestHandler.validate();

    if (session) {
      // let userPayload=await authHandler.readSessionCookie(session)
      req.userInfo = {
        userId: session.user.userId,
        sessionId: session.sessionId,
      };

      next();
    } else {
      return next({ message: "Unauthorized", status: 401 });
    }
  } catch (error) {
    next(error);
  }
}
