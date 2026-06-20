import { Elysia } from 'elysia';
import { requireAuth } from '@/src/middleware/auth.middleware';
import { reviewService } from '@/src/services/reviews/reviews.service';
import {
  createReviewBodySchema,
  reviewIdParamsSchema,
  updateReviewBodySchema,
} from '@/src/types/review/review.dto';

const isNotFound = (
  result: unknown,
): result is { message: 'Review not found' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'Review not found';

/** Review REST routes */
export const reviewRoute = new Elysia({ prefix: '/reviews' })
  .get('/', () => reviewService.getAllReviews())
  .get('/restReview/:restaurantId', async ({ params }) => {
    const restaurantId = Number(params.restaurantId);
    return reviewService.getReviewByRestaurantId(restaurantId);
  })
  .get('/user/:uuid', ({ params }) =>
    reviewService.getReviewsByUserId(params.uuid),
  )
  .get(
    '/:id',
    async ({ params, set }) => {
      const reviewId = Number(params.id);
      const result = await reviewService.getReviewById(reviewId);
      if (isNotFound(result)) {
        set.status = 404;
      }
      return result;
    },
    { params: reviewIdParamsSchema },
  )
  .use(requireAuth)
  .post(
    '/',
    async ({ body, auth, set }) => {
      if (!auth) {
        set.status = 401;
        return { message: 'Unauthorized' };
      }

      const result = await reviewService.createReview(body, auth.sub);
      set.status = 201;
      return result;
    },
    { body: createReviewBodySchema },
  )
  .put(
    '/:id',
    async ({ params, body, set }) => {
      const result = await reviewService.updateReview(body, params.id);
      if (isNotFound(result)) {
        set.status = 404;
        return result;
      }
      return result;
    },
    { params: reviewIdParamsSchema, body: updateReviewBodySchema },
  )
  .delete(
    '/:id',
    async ({ params, set }) => {
      const result = await reviewService.deleteReview(params.id);
      if (isNotFound(result)) {
        set.status = 404;
      }
      return result;
    },
    { params: reviewIdParamsSchema },
  );
