-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN "variantColor" TEXT;
ALTER TABLE "OrderItem" ADD COLUMN "variantId" INTEGER;
ALTER TABLE "OrderItem" ADD COLUMN "variantTitle" TEXT;

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
