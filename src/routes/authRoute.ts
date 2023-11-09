import { NextFunction, Request, Response, Router } from "express";
import {
  LoginFormSchema,
  LoginFormType,
  RegisterFormSchema,
  RegisterFormType,
} from "./formSchema.js";

const authRouter = Router();
const routePrefix = "/auth";

// routes
authRouter
  .post(`${routePrefix}/login`, LoginRoute)
  .post(`${routePrefix}/register`, RegisterRoute);

// controllers
async function LoginRoute(req: Request, res: Response, next: NextFunction) {
  const formData: LoginFormType = req.body;

  try {
    const validForm = await LoginFormSchema.parseAsync(formData);

    if (!validForm) return next({ message: "Error occured try again!" });

    res.json({ msg: "Login route" });
  } catch (error) {
    next(error);
  }
}

async function RegisterRoute(req: Request, res: Response, next: NextFunction) {
  const formData: RegisterFormType = req.body;

  try {
    const validForm = await RegisterFormSchema.parseAsync(formData);

    if (!validForm) return next({ message: "Error occured try again!" });

    res.json({ msg: "Register route" });
  } catch (error) {
    next(error);
  }
}

export default authRouter;
