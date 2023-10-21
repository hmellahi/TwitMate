-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isFake" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Community_image_name_slug_bio_createdBy_createdAt_idx" ON "Community"("image", "name", "slug", "bio", "createdBy", "createdAt");
