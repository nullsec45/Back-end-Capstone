/*
  Warnings:

  - You are about to drop the column `profileId` on the `user_addresses` table. All the data in the column will be lost.
  - Added the required column `userId` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_addresses` DROP FOREIGN KEY `user_addresses_profileId_fkey`;

-- AlterTable
ALTER TABLE `user_addresses` DROP COLUMN `profileId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `user_addresses` ADD CONSTRAINT `user_addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
