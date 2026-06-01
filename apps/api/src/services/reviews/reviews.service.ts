import { eq } from 'drizzle-orm';
import { review } from '@db/schema';
import { db } from '@db/db';
import {
  type CreateReviewBody,
  type UpdateReviewBody,
  toDbRating,
  toPublicReview,
} from '../../types/review/review.dto';

const toInsertValues = (body: CreateReviewBody, userId: string) => ({
  rest_id: body.rest_id,
  user_id: userId,
  review_des: body.review_des,
  rating: toDbRating(body.rating),
});

const toUpdateValues = (body: UpdateReviewBody) => ({
  ...(body.review_des !== undefined && { review_des: body.review_des }),
  ...(body.rating !== undefined && { rating: toDbRating(body.rating) }),
});

export const reviewService = {
  async getAllReviews() {
    const rows = await db.select().from(review);
    return rows.map(toPublicReview);
  },

  async getReviewById(id: number) {
    const [row] = await db.select().from(review).where(eq(review.id, id));

    if (!row) {
      return { message: 'Review not found' as const };
    }

    return toPublicReview(row);
  },

  async createReview(body: CreateReviewBody, userId: string) {
    const [row] = await db
      .insert(review)
      .values(toInsertValues(body, userId))
      .returning();
    return toPublicReview(row);
  },

  async updateReview(body: UpdateReviewBody, id: number) {
    const [row] = await db
      .update(review)
      .set(toUpdateValues(body))
      .where(eq(review.id, id))
      .returning();

    if (!row) {
      return { message: 'Review not found' as const };
    }

    return toPublicReview(row);
  },

  async deleteReview(id: number) {
    const [row] = await db
      .delete(review)
      .where(eq(review.id, id))
      .returning({ id: review.id });

    if (!row) {
      return { message: 'Review not found' as const };
    }

    return { message: 'Review deleted', id: row.id };
  },
};
