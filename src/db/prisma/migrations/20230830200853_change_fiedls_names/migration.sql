/*
  Warnings:

  - You are about to drop the column `author` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the column `community` on the `Thread` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_author_fkey";

-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_community_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "author",
DROP COLUMN "community",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "communityId" TEXT;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
