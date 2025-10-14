/*
  Warnings:

  - You are about to drop the `Scrap_Items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Cart_items" DROP CONSTRAINT "Cart_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order_items" DROP CONSTRAINT "Order_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Scrap_Items" DROP CONSTRAINT "Scrap_Items_store_id_fkey";

-- DropTable
DROP TABLE "public"."Scrap_Items";

-- CreateTable
CREATE TABLE "public"."ScrapItems" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_desc" TEXT,
    "price" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "imgUrl" TEXT,
    "store_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScrapItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ScrapItems" ADD CONSTRAINT "ScrapItems_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_items" ADD CONSTRAINT "Order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."ScrapItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_items" ADD CONSTRAINT "Cart_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."ScrapItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
