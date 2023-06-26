-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "nsfw" BOOLEAN NOT NULL,
    "icon" TEXT,
    "banner" TEXT,
    "countSubscribers" INTEGER NOT NULL DEFAULT 0,
    "countPosts" INTEGER NOT NULL DEFAULT 0,
    "countComments" INTEGER NOT NULL DEFAULT 0,
    "countUsersActiveDay" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);
