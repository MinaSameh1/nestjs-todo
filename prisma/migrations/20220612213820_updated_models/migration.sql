-- AlterTable
ALTER TABLE "bookmarks" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "remindTime" INTEGER,
ADD COLUMN     "repeat" TEXT DEFAULT E'',
ALTER COLUMN "color" SET DEFAULT 0,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;
