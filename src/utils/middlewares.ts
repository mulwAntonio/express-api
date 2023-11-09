import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

interface errorObj {
  message: string | ZodError["formErrors"]["fieldErrors"];
  stack?: string;
  statusCode?: number;
}

export function ErrorHandler(
  err: errorObj,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let msg = err.message;
  let stack = err.stack ?? msg;
  let statusCode = err.statusCode ?? 500;

  if (err instanceof ZodError) {
    const { formErrors } = err;

    msg = formErrors.fieldErrors;
    statusCode = 400;
  }

  res.status(statusCode).json({ msg, stack });
}
