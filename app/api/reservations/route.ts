import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const inventory = await prisma.inventory.findFirst({
      where: {
        productId: body.productId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    const availableStock =
      inventory.totalStock - inventory.reservedStock;

    if (body.quantity > availableStock) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    const reservation =
      await prisma.reservation.create({
        data: {
          productId: body.productId,
          quantity: body.quantity,
          expiresAt: new Date(
            Date.now() + 15 * 60 * 1000
          ),
        },
      });

    await prisma.inventory.update({
      where: {
        id: inventory.id,
      },
      data: {
        reservedStock: {
          increment: body.quantity,
        },
      },
    });

    return NextResponse.json(
      reservation,
      { status: 201 }
    );

  } catch {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}