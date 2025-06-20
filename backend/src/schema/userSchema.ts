import z from "zod/v4";

export const registerUserSchema = z
  .object({
    firstName: z.string({
      error: (iss) =>
        iss.input === undefined
          ? "FirstName is required."
          : "Invalid FirstName.",
    }),
    lastName: z.string({
      error: (iss) =>
        iss.input === undefined ? "LastName is required." : "Invalid LastName.",
    }),
    email: z.email({
      error: (iss) =>
        iss.input === undefined ? "Email is required." : "Invalid Email",
    }),
    password: z
      .string({
        error: (iss) => iss.input === undefined && "Password is required.",
      })
      .min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string({
      error: (iss) =>
        iss.input === undefined && "Password Confirmation is required.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
  });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type RegisterUserDBInput = Omit<
  RegisterUserInput,
  "passwordConfirmation"
>;

export const LoginUserSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required." : "Invalid Email",
  }),
  password: z.string({
    error: (iss) => iss.input === undefined && "Password is required.",
  }),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
