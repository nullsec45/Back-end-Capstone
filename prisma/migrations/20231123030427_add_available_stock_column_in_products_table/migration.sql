/*
  Warnings:

  - Added the required column `availableStock` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `availableStock` INTEGER NOT NULL;
