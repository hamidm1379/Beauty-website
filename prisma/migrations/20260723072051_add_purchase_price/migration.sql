-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "sku" TEXT,
    "barcode" TEXT,
    "price" INTEGER NOT NULL,
    "discountPrice" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "soldCount" INTEGER NOT NULL DEFAULT 0,
    "weight" REAL,
    "thumbnail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "brandId" INTEGER,
    "categoryId" INTEGER NOT NULL,
    "purchasePrice" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("barcode", "brandId", "categoryId", "createdAt", "description", "discountPrice", "id", "price", "seoDescription", "seoKeywords", "seoTitle", "shortDescription", "sku", "slug", "soldCount", "status", "stock", "thumbnail", "title", "updatedAt", "weight") SELECT "barcode", "brandId", "categoryId", "createdAt", "description", "discountPrice", "id", "price", "seoDescription", "seoKeywords", "seoTitle", "shortDescription", "sku", "slug", "soldCount", "status", "stock", "thumbnail", "title", "updatedAt", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
