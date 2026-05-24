import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const reservation =
      await prisma.$transaction(
        async (tx) => {

          const inventory =
            await tx.inventory.findFirst({
              where: {
                productId:
                  body.productId,
              },
            });

          if (!inventory) {
            throw new Error(
              "Product not found"
            );
          }

          const available =
            inventory.totalStock -
            inventory.reservedStock;

          if (
            available <
            body.quantity
          ) {
            throw new Error(
              "Insufficient stock"
            );
          }

          await tx.inventory.update({
            where: {
              id: inventory.id,
            },
            data: {
              reservedStock: {
                increment:
                  body.quantity,
              },
            },
          });

          return await tx.reservation.create({
            data: {
              productId:
                body.productId,
              quantity:
                body.quantity,
              expiresAt:
                new Date(
                  Date.now() +
                    15 *
                      60 *
                      1000
                ),
            },
          });
        }
      );

    return NextResponse.json(
      reservation,
      {
        status: 201,
      }
    );

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Failed";

    return NextResponse.json(
      {
        error:
          message,
      },
      {
        status:
          message ===
          "Insufficient stock"
            ? 409
            : 500,
      }
    );
  }
}