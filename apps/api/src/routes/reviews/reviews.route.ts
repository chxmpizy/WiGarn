import { Elysia } from 'elysia';
import { requireAuth } from '../../middleware/auth.middleware';
import { reviewService } from '../../services/reviews/reviews.service';
import {
  createReviewBodySchema,
  reviewIdParamsSchema,
  updateReviewBodySchema,
} from '../../types/review/review.dto';

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
  .get(
    '/:id',
    async ({ params, set }) => {
      const result = await reviewService.getReviewById(params.id);
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
      const result = await reviewService.createReview(body, auth!.sub);
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
