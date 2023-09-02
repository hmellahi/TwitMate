-- CreateTable
CREATE TABLE "ThreadLikes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThreadLikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadLikes" ADD CONSTRAINT "liker" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThreadLikes" ADD CONSTRAINT "ThreadLikes_id_fkey" FOREIGN KEY ("id") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
