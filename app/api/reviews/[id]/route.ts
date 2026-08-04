import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/_lib/db";
import { verifySession } from "@/app/_lib/auth";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const reviewId = Number(id);
    const review = await db.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    if (review.user_id !== session.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
