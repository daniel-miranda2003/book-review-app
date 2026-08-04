import { NextResponse } from "next/server";
import { db } from "@/app/_lib/db";
import { verifySession } from "@/app/_lib/auth";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const reviews = await db.review.findMany({
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { book_title, rating, review, mood } = body;

    if (!book_title || !rating || !review || !mood) {
      return NextResponse.json({ message: "Incomplete data" }, { status: 400 });
    }

    const newReview = await db.review.create({
      data: {
        book_title,
        rating: Number(rating),
        review,
        mood,
        user_id: session.userId,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
