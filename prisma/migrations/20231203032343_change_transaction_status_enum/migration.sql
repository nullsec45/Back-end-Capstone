/*
  Warnings:

  - The values [PENDING] on the enum `transactions_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `status` ENUM('UNPAID', 'AWATING_CONFIRMATION', 'APPROVED', 'REJECTED') NOT NULL;
