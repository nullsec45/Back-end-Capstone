/*
  Warnings:

  - You are about to alter the column `price` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Double`.
  - You are about to alter the column `subTotal` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Double`.
  - You are about to alter the column `totalAmount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Double`.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Double`.
  - You are about to alter the column `transactionAmount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `order_details` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `subTotal` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `totalAmount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `transactionAmount` DOUBLE NOT NULL;
