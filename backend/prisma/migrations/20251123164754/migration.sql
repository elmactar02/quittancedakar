/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `notification_targetId_fkey`;

-- DropTable
DROP TABLE `notification`;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(100) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `target_id` VARCHAR(191) NOT NULL,
    `seen_at` DATETIME(3) NULL,
    `sent_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
