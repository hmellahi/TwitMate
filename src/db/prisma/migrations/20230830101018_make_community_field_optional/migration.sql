ALTER TABLE "Thread" DROP CONSTRAINT "parentOf";
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_community_fkey";

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "community" DROP NOT NULL;

-- RenameForeignKey
ALTER TABLE "Thread" RENAME CONSTRAINT "Thread_id_fkey" TO "parentOf";

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_community_fkey" FOREIGN KEY ("community") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;
