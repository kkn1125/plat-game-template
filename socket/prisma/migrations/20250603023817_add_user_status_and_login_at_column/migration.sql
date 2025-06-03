-- AlterTable
ALTER TABLE `user` ADD COLUMN `login_at` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'playing';
