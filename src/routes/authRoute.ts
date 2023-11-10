import { NextFunction, Request, Response, Router } from "express";
import {
  LoginFormSchema,
  LoginFormType,
  RegisterFormSchema,
  RegisterFormType,
} from "./formSchema.js";
import { authHandler } from "../utils/lucia.js";
import { ValidateCredentials } from "../utils/middlewares.js";

const authRouter = Router();
const routePrefix = "/auth";

// routes
authRouter
  .post(`${routePrefix}/login`, LoginRoute)
  .post(`${routePrefix}/register`, RegisterRoute)
  .get(`${routePrefix}/logout`, ValidateCredentials, LogoutRoute);

// controllers
async function LoginRoute(req: Request, res: Response, next: NextFunction) {
  const formData: LoginFormType = req.body;
  const authRequestHandler = authHandler.handleRequest(req, res);

  try {
    const validForm = await LoginFormSchema.parseAsync(formData);

    if (!validForm) return next({ message: "Error occured try again!" });

    const authKey = await authHandler.useKey(
      "email",
      validForm.email.toLowerCase(),
      validForm.password
    );
    const session = await authHandler.createSession({
      userId: authKey.userId,
      attributes: {},
    });

    authRequestHandler.setSession(session);

    res.json({ msg: "Login success!" });
  } catch (error) {
    next(error);
  }
}

async function RegisterRoute(req: Request, res: Response, next: NextFunction) {
  const formData: RegisterFormType = req.body;

  try {
    const validForm = await RegisterFormSchema.parseAsync(formData);

    if (!validForm) return next({ message: "Error occured try again!" });

    await authHandler.createUser({
      key: {
        providerId: "email",
        providerUserId: validForm.email,
        password: validForm.password,
      },
      attributes: {
        email: validForm.email,
        username: validForm.username,
      },
    });

    res.json({ msg: "User created success" });
  } catch (error) {
    next(error);
  }
}

async function LogoutRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { sessionId } = req.userInfo!;

    if (sessionId) {
      await authHandler.invalidateSession(sessionId);

      res.json({ msg: "Logout success" });

      return;
    }

    next({ message: "Internal error" });
  } catch (error) {
    next(error);
  }
}

export default authRouter;
