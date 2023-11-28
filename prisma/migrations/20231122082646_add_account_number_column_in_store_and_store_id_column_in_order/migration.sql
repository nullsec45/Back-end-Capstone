/*
  Warnings:

  - Added the required column `storeId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `storeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `stores` ADD COLUMN `accountNumber` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
