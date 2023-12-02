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
