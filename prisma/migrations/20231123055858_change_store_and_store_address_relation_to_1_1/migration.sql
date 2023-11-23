/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `store_addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `store_addresses_storeId_key` ON `store_addresses`(`storeId`);
