import { Elysia } from 'elysia';
import { restaurantService } from '@/src/services/restaurants/restaurants.service';
import {
  createRestaurantBodySchema,
  restaurantIdParamsSchema,
  updateRestaurantBodySchema,
} from '../../types/restaurant/restaurant.dto';

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
export const restaurantsRoute = new Elysia({ prefix: '/restaurants' })
  .get('/', () => restaurantService.getAllRestaurants())
  .get(
    '/:id',
    async ({ params, set }) => {
      const restaurantId = Number(params.id);
      const result = await restaurantService.getRestaurantById(restaurantId);
      if (isNotFound(result)) {
        set.status = 404;
      }
      return result;
    },
    { params: restaurantIdParamsSchema },
  )
  .post(
    '/',
    async ({ body, set }) => {
      const result = await restaurantService.createRestaurant(body);
      if (isConflict(result)) {
        set.status = 409;
        return result;
      }
      set.status = 201;
      return result;
    },
    { body: createRestaurantBodySchema },
  )
  .put(
    '/:id',
    async ({ params, body, set }) => {
      const result = await restaurantService.updateRestaurant(body, params.id);
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
    { params: restaurantIdParamsSchema, body: updateRestaurantBodySchema },
  )
  .delete(
    '/:id',
    async ({ params, set }) => {
      const result = await restaurantService.deleteRestaurant(params.id);
      if (isNotFound(result)) {
        set.status = 404;
      }
      return result;
    },
    { params: restaurantIdParamsSchema },
  );
