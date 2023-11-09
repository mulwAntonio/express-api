import { z } from "zod";

export const LoginFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Email required!",
      })
      .email({ message: "Invalid email" }),
    password: z.string({
      required_error: "Password required!",
      invalid_type_error: "Invalid Password",
    }),
  })
  .required();

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = LoginFormSchema.extend({
  username: z.string({
    required_error: "Username required!",
    invalid_type_error: "Invalid username",
  }),
}).required();

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
