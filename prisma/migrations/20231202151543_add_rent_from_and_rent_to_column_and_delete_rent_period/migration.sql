/*
  Warnings:

  - You are about to drop the column `rentPeriod` on the `order_details` table. All the data in the column will be lost.
  - Added the required column `rentFrom` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentTo` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_details` DROP COLUMN `rentPeriod`,
    ADD COLUMN `rentFrom` DATETIME(3) NOT NULL,
    ADD COLUMN `rentTo` DATETIME(3) NOT NULL;
