import { z } from 'zod';
import type { SelectReview } from '../../../db/schema';

export type ReviewRating = '1' | '2' | '3' | '4' | '5';
// export const reviewRatingSchema =

export const createRestaurantBodySchema = z.object({
  name: z.string().min(1),
  description: z.email().nullable(),
  address: z.string().min(1),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string(),
  website: z.string().nullable(),
  imageUrl: z.string(),
});
export const updateRestaurantBodySchema = z.object({
  name: z.string().optional(),
  description: z.email().nullable().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().nullable().optional(),
  imageUrl: z.string().optional(),
});
export const restaurantIdParamsSchema = z.object({
  id: z.number(),
});

export type CreateRestaurantBody = z.infer<typeof createRestaurantBodySchema>;
export type UpdateRestaurantBody = z.infer<typeof updateRestaurantBodySchema>;

export const toPublicReview = (row: SelectReview): Review => ({
  id: row.id,
  rest_id: row.rest_id,
  user_id: row.user_id,
  review_des: row.review_des,
  rating: row.rating,
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
