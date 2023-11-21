/*
  Warnings:

  - You are about to alter the column `paymentMethod` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `paymentMethod` ENUM('TRANSFER') NOT NULL,
    MODIFY `transactionAmount` DOUBLE NULL,
    MODIFY `paymentProof` VARCHAR(191) NULL;
