import { eq } from 'drizzle-orm';
import { restaurantsTable, review, usersTable } from '@db/schema';
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
  rating: Number(toDbRating(body.rating)),
  updatedAt: new Date(),
});

const toUpdateValues = (body: UpdateReviewBody) => ({
  ...(body.review_des !== undefined && { review_des: body.review_des }),
  ...(body.rating !== undefined && { rating: Number(toDbRating(body.rating)) }),
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
  async getReviewByRestaurantId(rest_id: number) {
    const rows = await db
      .select({
        id: review.id,
        rest_id: review.rest_id,
        user_id: review.user_id,
        rating: review.rating,
        review_des: review.review_des,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        user: {
          uuid: usersTable.uuid,
          name: usersTable.name,
          image_url: usersTable.image_url,
        },
      })
      .from(review)
      .leftJoin(usersTable, eq(review.user_id, usersTable.uuid))
      .where(eq(review.rest_id, rest_id));
    return rows;
  },

  async getReviewsByUserId(userId: string) {
    return db
      .select({
        id: review.id,
        rest_id: review.rest_id,
        user_id: review.user_id,
        rating: review.rating,
        review_des: review.review_des,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        restaurant: {
          id: restaurantsTable.id,
          name: restaurantsTable.name,
          category: restaurantsTable.category,
          image_url: restaurantsTable.image_url,
          city: restaurantsTable.city,
          state: restaurantsTable.state,
        },
      })
      .from(review)
      .leftJoin(restaurantsTable, eq(review.rest_id, restaurantsTable.id))
      .where(eq(review.user_id, userId));
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
