/*
  Warnings:

  - Added the required column `threadId` to the `ThreadLikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ThreadLikes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ThreadLikes" DROP CONSTRAINT "ThreadLikes_id_fkey";

-- DropForeignKey
ALTER TABLE "ThreadLikes" DROP CONSTRAINT "liker";

-- AlterTable
ALTER TABLE "ThreadLikes" ADD COLUMN     "threadId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ThreadLikes" ADD CONSTRAINT "liker" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadLikes" ADD CONSTRAINT "ThreadLikes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
