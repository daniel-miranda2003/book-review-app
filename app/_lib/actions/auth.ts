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
      message: "Please fix the errors to proceed.",
    };
  }

  const existingUser = await getUserByEmail(validatedFields.data.email);
  if (existingUser) {
    return {
      message: "That email is already registered. Try logging in instead.",
    };
  }

  const user = await createUser(validatedFields.data);
  await createSession(user.id);
  redirect("/reviews?success=register");
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
      message: "Required fields are missing.",
    };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return { message: "Invalid email or password." };
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return { message: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/reviews?success=login");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
