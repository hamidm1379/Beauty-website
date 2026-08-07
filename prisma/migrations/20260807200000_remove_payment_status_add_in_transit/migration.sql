-- RedefineTables
PRAGMA foreign_keys=OFF;

-- Create new table without paymentStatus
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
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

-- Copy data
INSERT INTO "new_Order" ("id", "orderNumber", "status", "subtotal", "discount", "shippingCost", "total", "trackingCode", "notes", "createdAt", "updatedAt", "userId", "addressId", "couponId")
SELECT "id", "orderNumber", "status", "subtotal", "discount", "shippingCost", "total", "trackingCode", "notes", "createdAt", "updatedAt", "userId", "addressId", "couponId" FROM "Order";

-- Drop old table
DROP TABLE "Order";

-- Rename new table
ALTER TABLE "new_Order" RENAME TO "Order";

-- Create unique index
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- Create indexes
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "Order_addressId_idx" ON "Order"("addressId");
CREATE INDEX "Order_couponId_idx" ON "Order"("couponId");

PRAGMA foreign_keys=ON;
