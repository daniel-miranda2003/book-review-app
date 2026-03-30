import { NextResponse } from "next/server";
import { SignupSchema } from "@/app/_lib/definitions";
import { createUser, getUserByEmail } from "@/app/_lib/dal/users";
import { createSession } from "@/app/_lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = SignupSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await createUser(validatedFields.data);
    await createSession(user.id);

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
