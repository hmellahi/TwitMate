-- DropIndex
DROP INDEX "ThreadImages_imageUrl_createdAt_userId_threadId_idx";

-- DropIndex
DROP INDEX "User_username_image_createdAt_onboarded_bio_name_updatedAt_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "ThreadImages_imageUrl_createdAt_userId_threadId_height_widt_idx" ON "ThreadImages"("imageUrl", "createdAt", "userId", "threadId", "height", "width");

-- CreateIndex
CREATE INDEX "User_username_image_createdAt_onboarded_bio_name_updatedAt__idx" ON "User"("username", "image", "createdAt", "onboarded", "bio", "name", "updatedAt", "location", "isAdmin");
