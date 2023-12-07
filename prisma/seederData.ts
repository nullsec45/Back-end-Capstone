import { hashSync } from 'bcryptjs';

export const users = [
  {
    id: 'user-1',
    username: 'dodo',
    email: 'dodo@gmail.com',
    password: hashSync('dodo123', 10),
  },
  {
    id: 'user-2',
    username: 'rizki',
    email: 'rizki@gmail.com',
    password: hashSync('rizki123', 10),
  },
];

export const userAddresses = [
  {
    id: 'userAddress-1',
    userId: 'user-2',
    label: 'Rumah',
    recipientName: 'Bapak Budi',
    phoneNumber: '08977771111',
    province: 'Jawa Tengah',
    city: 'Semarang',
    district: 'Tembalang',
    subDistrict: 'Klipang',
    fullAddress: 'Jl Durian RT05/RW02 No.12',
    postalCode: '50123',
    latitude: '123.145',
    longitude: '60.177',
  },
];

export const stores = [
  {
    id: 'store-1',
    userId: 'user-2',
    name: 'Toko Kita',
    phoneNumber: '081234349898',
    bank: 'bri',
    description: 'Deskripsi Toko Kita',
    accountNumber: '111155553333',
    profilePicture: 'https://example.com/toko-kita.jpg',
  },
];

export const categories = [
  {
    id: 'category-1',
    name: 'Elektronik',
    description: 'Deskripsi Kategori Elektronik',
  },
  {
    id: 'category-2',
    name: 'Lainnya',
    description: 'Deskripsi Kategori Lainnya',
  },
];

export const products = [
  {
    id: 'product-1',
    storeId: 'store-1',
    categoryId: 'category-1',
    name: 'PS 5',
    description: 'Deskripsi PS5 (Playstation 5)',
    price: 100000,
    maximumRental: 10,
    stock: 8,
    availableStock: 8,
  },
];

export const order = {
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
};
