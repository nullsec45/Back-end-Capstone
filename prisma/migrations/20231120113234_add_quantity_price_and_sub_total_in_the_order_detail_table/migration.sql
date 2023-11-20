/*
  Warnings:

  - Added the required column `price` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_details` ADD COLUMN `price` DECIMAL(20, 2) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `subTotal` DECIMAL(20, 2) NOT NULL;
