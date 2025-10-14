-- AlterTable
ALTER TABLE "Stores" ALTER COLUMN "s_sub_district" DROP NOT NULL,
ALTER COLUMN "s_district" DROP NOT NULL,
ALTER COLUMN "s_province" DROP NOT NULL;
