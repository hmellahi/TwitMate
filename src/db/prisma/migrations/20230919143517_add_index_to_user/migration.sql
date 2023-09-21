-- DropIndex
DROP INDEX "User_username_image_createdAt_idx";

-- CreateIndex
CREATE INDEX "User_username_image_createdAt_onboarded_bio_name_updatedAt_idx" ON "User"("username", "image", "createdAt", "onboarded", "bio", "name", "updatedAt");
