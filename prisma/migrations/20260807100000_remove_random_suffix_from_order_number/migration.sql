-- Remove random suffix from order numbers (keep only the timestamp part)
UPDATE "Order" SET "orderNumber" = substr("orderNumber", 1, 13);
