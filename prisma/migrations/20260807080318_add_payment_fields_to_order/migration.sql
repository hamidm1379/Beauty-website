-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "authority" TEXT,
    "refId" TEXT,
    "subtotal" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "shippingCost" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,
    "trackingCode" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "couponId" INTEGER,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("addressId", "couponId", "createdAt", "discount", "id", "notes", "orderNumber", "shippingCost", "status", "subtotal", "total", "trackingCode", "updatedAt", "userId") SELECT "addressId", "couponId", "createdAt", "discount", "id", "notes", "orderNumber", "shippingCost", "status", "subtotal", "total", "trackingCode", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
