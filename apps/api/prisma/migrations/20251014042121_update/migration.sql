/*
  Warnings:

  - You are about to drop the `Cart_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cart_items" DROP CONSTRAINT "Cart_items_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Cart_items" DROP CONSTRAINT "Cart_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Messages" DROP CONSTRAINT "Messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order_items" DROP CONSTRAINT "Order_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order_items" DROP CONSTRAINT "Order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Orders" DROP CONSTRAINT "Orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScrapItems" DROP CONSTRAINT "ScrapItems_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ShippingAddress" DROP CONSTRAINT "ShippingAddress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stores" DROP CONSTRAINT "stores_user_id_fkey";

-- DropTable
DROP TABLE "public"."Cart_items";

-- DropTable
DROP TABLE "public"."Order_items";

-- DropTable
DROP TABLE "public"."stores";

-- DropTable
DROP TABLE "public"."users";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "s_road" TEXT,
    "sub_district" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "b_date" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "postcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stores" (
    "id" SERIAL NOT NULL,
    "s_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "s_size" "StoreSize" NOT NULL,
    "estimated_date" TIMESTAMP(3) NOT NULL,
    "s_imgUrl" TEXT[],
    "s_house_number" TEXT NOT NULL,
    "s_road" TEXT,
    "s_sub_district" TEXT NOT NULL,
    "s_district" TEXT NOT NULL,
    "s_province" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "s_status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItems" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Stores" ADD CONSTRAINT "Stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapItems" ADD CONSTRAINT "ScrapItems_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ScrapItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ScrapItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
