/*
  Warnings:

  - You are about to drop the column `direction` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `location` table. All the data in the column will be lost.
  - You are about to drop the `user_location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_location` DROP FOREIGN KEY `user_location_location_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_location` DROP FOREIGN KEY `user_location_user_id_fkey`;

-- AlterTable
ALTER TABLE `location` DROP COLUMN `direction`,
    DROP COLUMN `x`,
    DROP COLUMN `y`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `direction` ENUM('UP', 'DOWN', 'LEFT', 'RIGHT') NOT NULL DEFAULT 'UP',
    ADD COLUMN `x` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `y` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `user_location`;
