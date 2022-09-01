/*
  Warnings:

  - You are about to drop the column `isBot` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "appId" TEXT,
    "botId" TEXT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "email" TEXT,
    "imageUrl" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("appId", "botId", "color", "createdAt", "email", "id", "imageUrl", "isDeleted", "name", "type", "updatedAt") SELECT "appId", "botId", "color", "createdAt", "email", "id", "imageUrl", "isDeleted", "name", "type", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_appId_key" ON "User"("appId");
CREATE UNIQUE INDEX "User_botId_key" ON "User"("botId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
