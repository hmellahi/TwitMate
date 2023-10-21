/*
  Warnings:

  - A unique constraint covering the columns `[userId,threadId]` on the table `ThreadLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ThreadLikes_userId_threadId_key" ON "ThreadLikes"("userId", "threadId");
