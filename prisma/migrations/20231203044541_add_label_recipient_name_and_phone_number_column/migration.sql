/*
  Warnings:

  - Added the required column `label` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_addresses` ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `recipientName` VARCHAR(191) NOT NULL;
