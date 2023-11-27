/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `transactionAmount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `totalAmount` DECIMAL(20, 2) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL(20, 2) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `transactionAmount` DECIMAL(20, 2) NOT NULL;
