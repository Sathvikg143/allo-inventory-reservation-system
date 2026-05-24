import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.inventory.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Hyderabad Warehouse",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "Wireless Mouse",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Mechanical Keyboard",
    },
  });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalStock: 50,
      },
      {
        productId: product2.id,
        warehouseId: warehouse2.id,
        totalStock: 25,
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });