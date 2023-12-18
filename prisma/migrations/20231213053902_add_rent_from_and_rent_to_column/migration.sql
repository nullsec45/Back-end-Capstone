/*
  Warnings:

  - Added the required column `rentFrom` to the `product_in_cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentTo` to the `product_in_cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_in_cart` ADD COLUMN `rentFrom` DATETIME(3) NOT NULL,
    ADD COLUMN `rentTo` DATETIME(3) NOT NULL;
