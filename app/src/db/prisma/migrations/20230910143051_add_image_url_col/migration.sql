/*
  Warnings:

  - Added the required column `imageUrl` to the `ThreadImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ThreadImages" ADD COLUMN     "imageUrl" TEXT NOT NULL;
