/*
  Warnings:

  - You are about to drop the column `buttonLink` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `Banner` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image" TEXT NOT NULL,
    "mobileImage" TEXT,
    "buttonText" TEXT,
    "link" TEXT,
    "position" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "startDate" DATETIME,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER,
    "productId" INTEGER,
    CONSTRAINT "Banner_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Banner_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Banner" ("buttonText", "categoryId", "createdAt", "id", "image", "mobileImage", "position", "productId", "subtitle", "title", "updatedAt") SELECT "buttonText", "categoryId", "createdAt", "id", "image", "mobileImage", "position", "productId", "subtitle", "title", "updatedAt" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
