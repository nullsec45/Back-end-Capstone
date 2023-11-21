/*
  Warnings:

  - The values [VERIFIED] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL;
