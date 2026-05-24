import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const warehouses =
      await prisma.warehouse.findMany({
        include: {
          inventories: {
            include: {
              product: true,
            },
          },
        },
      });

    return NextResponse.json(
      warehouses,
      { status: 200 }
    );

  } catch {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}