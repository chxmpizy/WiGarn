-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."StoreSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."GetItemChannel" AS ENUM ('SELF_PICK', 'DELIVERY');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('BANKING', 'PROMPTPAY');

-- CreateEnum
CREATE TYPE "public"."MessageType" AS ENUM ('TEXT', 'IMAGE', 'FILE', 'VIDEO');

-- CreateTable
CREATE TABLE "public"."users" (
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
    "b_date" TIMESTAMP(3) NOT NULL,
    "role" "public"."Role" NOT NULL,
    "postcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stores" (
    "id" SERIAL NOT NULL,
    "s_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "s_size" "public"."StoreSize" NOT NULL,
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

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Scrap_Items" (
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

    CONSTRAINT "Scrap_Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShippingAddress" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "house_number" TEXT NOT NULL,
    "road" TEXT,
    "sub_district" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Orders" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "channel" "public"."GetItemChannel" NOT NULL,
    "total_price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cart_items" (
    "id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Conversations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" SERIAL NOT NULL,
    "conver_id" INTEGER NOT NULL,
    "sender_id" TEXT NOT NULL,
    "content" TEXT[],
    "messageType" "public"."MessageType" NOT NULL,
    "mediaUrl" TEXT,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Scrap_Items" ADD CONSTRAINT "Scrap_Items_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShippingAddress" ADD CONSTRAINT "ShippingAddress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_items" ADD CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order_items" ADD CONSTRAINT "Order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Scrap_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_items" ADD CONSTRAINT "Cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cart_items" ADD CONSTRAINT "Cart_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Scrap_Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_conver_id_fkey" FOREIGN KEY ("conver_id") REFERENCES "public"."Conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
