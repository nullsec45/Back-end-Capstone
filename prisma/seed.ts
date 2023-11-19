import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const ahmad = await prisma.user.upsert({
    where: { email: 'ahmad@gmail.com' },
    update: {},
    create: {
      email: 'ahmad@gmail.com',
      password: 'ahmad',
      username: 'ahmad',
    },
  });

  const electronic = await prisma.category.upsert({
    where: { id: 'c58d789f-c681-4b36-9710-411bfbb6f7b3' },
    update: {},
    create: {
      id: 'c58d789f-c681-4b36-9710-411bfbb6f7b3',
      name: 'electronic',
      description: 'desc elektronik',
    },
  });

  console.log({ ahmad, electronic });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
