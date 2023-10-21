-- CreateIndex
CREATE INDEX "Thread_text_createdAt_parentId_communityId_authorId_idx" ON "Thread"("text", "createdAt", "parentId", "communityId", "authorId");

-- CreateIndex
CREATE INDEX "ThreadImages_imageUrl_createdAt_userId_threadId_idx" ON "ThreadImages"("imageUrl", "createdAt", "userId", "threadId");

-- CreateIndex
CREATE INDEX "ThreadLikes_createdAt_userId_threadId_idx" ON "ThreadLikes"("createdAt", "userId", "threadId");

-- CreateIndex
CREATE INDEX "User_username_image_createdAt_idx" ON "User"("username", "image", "createdAt");
