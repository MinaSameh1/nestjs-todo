/*
  Warnings:

  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_userName_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userName";
