import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const product1 = await prisma.product.upsert({
    where: { id:1, name: 'Smartphone' },
    update: {},
    create: {
      name: 'Smartphone',
      description: 'This is a Smartphone',
      price: 1000.00,
      stockQty: 3
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id:2, name: 'Notebook' },
    update: {},
    create: {
      name: 'Notebook',
      description: 'This is a Notebook',
      price: 3000.00,
      stockQty: 3
    },
  });

  console.log({ product1, product2 });
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
