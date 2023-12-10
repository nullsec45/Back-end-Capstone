/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountHolder` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stores` ADD COLUMN `accountHolder` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `reviews_userId_key` ON `reviews`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `reviews_productId_key` ON `reviews`(`productId`);
