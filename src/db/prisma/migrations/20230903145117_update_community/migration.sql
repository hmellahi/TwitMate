/*
  Warnings:

  - You are about to drop the column `username` on the `Community` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Community_username_key";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "username",
ADD COLUMN     "slug" TEXT NOT NULL;
