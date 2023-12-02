/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `stores_accountNumber_key` ON `stores`(`accountNumber`);
