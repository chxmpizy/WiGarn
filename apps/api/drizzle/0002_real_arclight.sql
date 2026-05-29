CREATE TYPE "public"."rating_values" AS ENUM('1', '2', '3', '4', '5');--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "rating" SET DATA TYPE "public"."rating_values" USING "rating"::"public"."rating_values";--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "rating" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image_url" varchar(255);--> statement-breakpoint
ALTER TABLE "restaurants" DROP COLUMN "avg_rating";--> statement-breakpoint
ALTER TABLE "restaurants" DROP COLUMN "review_count";