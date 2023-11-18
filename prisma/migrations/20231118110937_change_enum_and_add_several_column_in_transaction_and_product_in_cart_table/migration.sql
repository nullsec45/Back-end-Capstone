/*
  Warnings:

  - The values [SUCCESS,FAILED] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `quantity` to the `product_in_cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentProof` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_in_cart` ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `paymentProof` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'VERIFIED', 'REJECTED') NOT NULL;
