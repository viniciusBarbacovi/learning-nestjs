/*
  Warnings:

  - You are about to drop the column `description` on the `user` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "class_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    CONSTRAINT "Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("id", "name") SELECT "id", "name" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
