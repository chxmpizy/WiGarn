import { z } from 'zod';
import type { SelectReview } from '@db/schema';

export const reviewRatingSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export type ReviewRating = z.infer<typeof reviewRatingSchema>;

/** Postgres `rating_values` enum stores string digits */
export const toDbRating = (rating: ReviewRating) =>
  String(rating) as '1' | '2' | '3' | '4' | '5';

export const createReviewBodySchema = z.object({
  rest_id: z.number().int().positive(),
  rating: reviewRatingSchema,
  review_des: z.string().min(1),
});
export const updateReviewBodySchema = z.object({
  rating: reviewRatingSchema.optional(),
  review_des: z.string().optional(),
});
export const reviewIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateReviewBody = z.infer<typeof createReviewBodySchema>;
export type UpdateReviewBody = z.infer<typeof updateReviewBodySchema>;

export const toPublicReview = (row: SelectReview): Review => ({
  id: row.id,
  rest_id: row.rest_id,
  user_id: row.user_id,
  review_des: row.review_des,
  rating: Number(row.rating) as ReviewRating,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  
});

export interface Review {
  id: number;
  rest_id: number;
  user_id: string;
  rating: ReviewRating;
  review_des: string | null;
  createdAt: Date;
  updatedAt: Date;
}
