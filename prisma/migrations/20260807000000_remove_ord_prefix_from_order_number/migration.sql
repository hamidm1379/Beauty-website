-- Remove "ORD-" prefix from existing order numbers
UPDATE "Order" SET "orderNumber" = REPLACE("orderNumber", 'ORD-', '');
