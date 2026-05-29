import { Elysia } from 'elysia';
import { userServices } from '../../services/users/users.service';
import {
  createUserBodySchema,
  updateUserBodySchema,
  userUuidParamsSchema,
} from '../../types/user/user.dto';

const isNotFound = (result: unknown): result is { message: 'User not found' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'User not found';

const isConflict = (
  result: unknown,
): result is { message: 'Email already in use' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'Email already in use';

/** User REST routes */
export const usersRoute = new Elysia({ prefix: '/users' })
  .get('/', () => userServices.getAllUsers())
  .get(
    '/:uuid',
    async ({ params, set }) => {
      const result = await userServices.getUserByUid(params.uuid);
      if (isNotFound(result)) {
        set.status = 404;
      }
      return result;
    },
    { params: userUuidParamsSchema },
  )
  .post(
    '/',
    async ({ body, set }) => {
      const result = await userServices.createUser(body);
      if (isConflict(result)) {
        set.status = 409;
        return result;
      }
      set.status = 201;
      return result;
    },
    { body: createUserBodySchema },
  )
  .put(
    '/:uuid',
    async ({ params, body, set }) => {
      const result = await userServices.updateUser(body, params.uuid);
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
    { params: userUuidParamsSchema, body: updateUserBodySchema },
  )
  .delete(
    '/:uuid',
    async ({ params, set }) => {
      const result = await userServices.deleteUser(params.uuid);
      if (isNotFound(result)) {
        set.status = 404;
      }
      return result;
    },
    { params: userUuidParamsSchema },
  );
