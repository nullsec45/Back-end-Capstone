import { PrismaClient } from '@prisma/client';
import {
  categories,
  products,
  stores,
  userAddresses,
  users,
} from './seederData';

const prisma = new PrismaClient();

async function main() {
  // Perhatikan urutan alur foreign key saat melakukan delete di seeder
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  const createdUsers = await prisma.user.createMany({
    data: users,
  });
  console.log(`Users seed successfully, created ${createdUsers.count} data`);

  const createdUserAddresses = await prisma.userAddress.createMany({
    data: userAddresses,
  });
  console.log(
    `UserAddress seed successfully, created ${createdUserAddresses.count} data`,
  );

  const createdCategory = await prisma.category.createMany({
    data: categories,
  });
  console.log(
    `Categories seed successfully, created ${createdCategory.count} data`,
  );

  const createdStores = await prisma.store.createMany({
    data: stores,
  });
  console.log(`Stores seed successfully, created ${createdStores.count} data`);

  const createdProducts = await prisma.product.createMany({
    data: products,
  });
  console.log(
    `Products seed successfully, created ${createdProducts.count} data`,
  );

  const createdOrder = await prisma.order.create({
    data: {
      id: 'order-1',
      userId: 'user-2',
      userAddressId: 'userAddress-1',
      storeId: 'store-1',
      shipping: 'GOSEND',
      status: 'PENDING',
      totalAmount: 100000,
      products: {
        create: [
          {
            quantity: 1,
            rentFrom: '2023-12-02T17:00:00.000Z',
            rentTo: '2023-12-03T17:00:00.000Z',
            price: 100000,
            subTotal: 100000,
            product: {
              connect: {
                id: 'product-1',
              },
            },
          },
        ],
      },
      transaction: {
        create: {
          paymentMethod: 'TRANSFER',
          status: 'PENDING',
        },
      },
    },
  });
  console.log(`Order seed successfully, created ${createdOrder.id} id`);
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
