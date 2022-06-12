/*
  Warnings:

  - You are about to drop the column `time` on the `bookmarks` table. All the data in the column will be lost.
  - Added the required column `color` to the `bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `bookmarks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "time",
ADD COLUMN     "color" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
