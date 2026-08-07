-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" INTEGER NOT NULL,
    "productTitle" TEXT NOT NULL,
    "productImage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER,
    "variantId" INTEGER,
    "variantTitle" TEXT,
    "variantColor" TEXT,
    "purchasePrice" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("createdAt", "discount", "id", "orderId", "productId", "productImage", "productTitle", "purchasePrice", "quantity", "totalPrice", "unitPrice", "variantColor", "variantId", "variantTitle") SELECT "createdAt", "discount", "id", "orderId", "productId", "productImage", "productTitle", "purchasePrice", "quantity", "totalPrice", "unitPrice", "variantColor", "variantId", "variantTitle" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
CREATE TABLE "new_ProductVariant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER,
    "stock" INTEGER NOT NULL,
    "colorName" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,
    "size" TEXT,
    "image" TEXT,
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductVariant" ("colorCode", "colorName", "id", "image", "price", "productId", "size", "stock", "title") SELECT "colorCode", "colorName", "id", "image", "price", "productId", "size", "stock", "title" FROM "ProductVariant";
DROP TABLE "ProductVariant";
ALTER TABLE "new_ProductVariant" RENAME TO "ProductVariant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
