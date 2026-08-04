import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).trim(),
    email: z.string().email({ message: "Ingresa un correo electrónico válido." }).trim(),
    password: z
      .string()
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra." })
      .regex(/[0-9]/, { message: "Debe contener al menos un número." })
      .trim(),
    confirmPassword: z.string().min(1, { message: "Confirma tu contraseña." }).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo electrónico válido." }),
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
