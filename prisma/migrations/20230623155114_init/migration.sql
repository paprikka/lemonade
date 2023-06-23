-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "nsfw" BOOLEAN NOT NULL,
    "icon" TEXT,
    "banner" TEXT,
    "countSubscribers" INTEGER NOT NULL DEFAULT 0,
    "countPosts" INTEGER NOT NULL DEFAULT 0,
    "countComments" INTEGER NOT NULL DEFAULT 0,
    "countUsersActiveDay" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Community" ("banner", "countComments", "countPosts", "countSubscribers", "countUsersActiveDay", "description", "icon", "id", "name", "nsfw", "title") SELECT "banner", "countComments", "countPosts", "countSubscribers", "countUsersActiveDay", "description", "icon", "id", "name", "nsfw", "title" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
