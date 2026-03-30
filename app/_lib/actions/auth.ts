"use server";

import { z } from "zod";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import { FormState, LoginSchema, SignupSchema } from "../definitions";
import { getUserByEmail, createUser } from "../dal/users";
import { createSession, deleteSession } from "../auth";

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Corrige los errores para continuar.",
    };
  }

  const existingUser = await getUserByEmail(validatedFields.data.email);
  if (existingUser) {
    return {
      message: "Ese correo ya está registrado. Intenta iniciar sesión.",
    };
  }

  const user = await createUser(validatedFields.data);
  await createSession(user.id);
  redirect("/reviews?success=signup");
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Completa los campos requeridos.",
    };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return { message: "Correo o contraseña incorrectos." };
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return { message: "Correo o contraseña incorrectos." };
  }

  await createSession(user.id);
  redirect("/reviews?success=login");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
