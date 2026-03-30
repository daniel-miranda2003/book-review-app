import "server-only";

import { db } from "../db";
import { SignupSchema } from "../definitions";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user by email:", error);
    throw new Error("Database Error: Failed to fetch user.");
  }
}

export async function createUser(data: z.infer<typeof SignupSchema>) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    throw new Error("Database Error: Failed to insert user into the database.");
  }
}
