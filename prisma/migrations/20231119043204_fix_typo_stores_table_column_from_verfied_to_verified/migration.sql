/*
  Warnings:

  - You are about to drop the column `verfied` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stores` DROP COLUMN `verfied`,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
