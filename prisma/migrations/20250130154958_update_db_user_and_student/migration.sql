/*
  Warnings:

  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("created_at", "email", "id", "name", "role", "updated_at") SELECT "created_at", "email", "id", "name", "role", "updated_at" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
