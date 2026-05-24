import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reservation =
      await prisma.reservation.findUnique({
        where: { id },
      });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    await prisma.reservation.update({
      where: { id },
      data: {
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}