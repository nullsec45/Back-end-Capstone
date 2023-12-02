import { PrismaClient } from '@prisma/client';
import { categories, users } from './seederData';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  const createdUsers = await prisma.user.createMany({
    data: users,
  });

  console.log(`Users seed successfully, created ${createdUsers.count} data`);

  const createdCategory = await prisma.category.createMany({
    data: categories,
  });

  console.log(
    `Categories seed successfully, created ${createdCategory.count} data`,
  );
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
