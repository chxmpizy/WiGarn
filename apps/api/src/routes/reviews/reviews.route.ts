import { Elysia } from 'elysia';
import {
  createReviewBodySchema,
  reviewIdParamsSchema,
  updateReviewBodySchema,
} from '../../types/review/review.dto';
import { reviewService } from '../../services/reviews/reviews.service';

const isNotFound = (
  result: unknown,
): result is { message: 'Restaurant not found' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'Restaurant not found';

const isConflict = (
  result: unknown,
): result is { message: 'Restaurant already exists' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'Restaurant already exists';

/** Restaurant REST routes */
export const reviewRoute = new Elysia({ prefix: '/restaurants' })
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
  .post(
    '/',
    async ({ body, set }) => {
      const result = await reviewService.createReview(body);
      if (isConflict(result)) {
        set.status = 409;
        return result;
      }
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
      if (isConflict(result)) {
        set.status = 409;
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
