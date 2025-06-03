/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `exp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `gold` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `hp` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `maxHp` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `maxMp` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `mp` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
