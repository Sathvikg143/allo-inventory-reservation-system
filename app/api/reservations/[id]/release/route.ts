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
       where: { id }
     });

   if (!reservation) {
     return NextResponse.json(
       { error: "Reservation not found" },
       { status: 404 }
     );
   }

   if (reservation.status === "RELEASED") {
     return NextResponse.json(
       { error: "Already released" },
       { status: 400 }
     );
   }

   if (reservation.status === "CONFIRMED") {

     await prisma.inventory.updateMany({
       where: {
         productId: reservation.productId
       },
       data: {
         reservedStock: {
           decrement: reservation.quantity
         }
       }
     });
   }

   await prisma.reservation.update({
     where: { id },
     data: {
       status: "RELEASED"
     }
   });

   return NextResponse.json({
     success: true
   });

 } catch {
   return NextResponse.json(
     { error: "Release failed" },
     { status: 500 }
   );
 }
}