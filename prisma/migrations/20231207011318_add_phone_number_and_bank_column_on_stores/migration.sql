/*
  Warnings:

  - Added the required column `bank` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stores` ADD COLUMN `bank` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;
