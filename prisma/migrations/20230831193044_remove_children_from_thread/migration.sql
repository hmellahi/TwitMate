-- RenameForeignKey
ALTER TABLE "Thread" RENAME CONSTRAINT "ParentOf" TO "Thread_id_fkey";
