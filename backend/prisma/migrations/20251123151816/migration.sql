-- DropForeignKey
ALTER TABLE `locataires` DROP FOREIGN KEY `locataires_agence_id_fkey`;

-- DropIndex
DROP INDEX `locataires_agence_id_fkey` ON `locataires`;

-- AlterTable
ALTER TABLE `locataires` MODIFY `agence_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `locataires` ADD CONSTRAINT `locataires_agence_id_fkey` FOREIGN KEY (`agence_id`) REFERENCES `agences`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
