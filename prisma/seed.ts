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

  console.log({ ahmad });
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
