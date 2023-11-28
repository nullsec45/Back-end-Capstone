-- AlterTable
ALTER TABLE `transactions` MODIFY `paymentMethod` ENUM('TRANSFER', 'COD') NOT NULL;
