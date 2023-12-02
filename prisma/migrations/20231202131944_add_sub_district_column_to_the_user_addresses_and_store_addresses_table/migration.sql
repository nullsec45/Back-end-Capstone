/*
  Warnings:

  - Added the required column `subDistrict` to the `store_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subDistrict` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store_addresses` ADD COLUMN `subDistrict` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_addresses` ADD COLUMN `subDistrict` VARCHAR(191) NOT NULL;
