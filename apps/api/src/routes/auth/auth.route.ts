import { Elysia } from 'elysia';
import { requireAuth } from '../../middleware/auth.middleware';
import { authService } from '../../services/auth/auth.service';
import { loginBodySchema, registerBodySchema } from '../../types/auth/auth.dto';

const isUnauthorized = (
  result: unknown,
): result is { message: 'Invalid email or password' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'Invalid email or password';

const isConflict = (
  result: unknown,
): result is { message: 'Email already in use' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'Email already in use';

const isNotFound = (result: unknown): result is { message: 'User not found' } =>
  typeof result === 'object' &&
  result !== null &&
  'message' in result &&
  (result as { message: string }).message === 'User not found';

/** Auth routes: register, login, current user profile */
export const authRoute = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body, set }) => {
      const result = await authService.register(body);
      if (isConflict(result)) {
        set.status = 409;
        return result;
      }
      set.status = 201;
      return result;
    },
    { body: registerBodySchema },
  )
  .post(
    '/login',
    async ({ body, set }) => {
      const result = await authService.login(body);
      if (isUnauthorized(result)) {
        set.status = 401;
      }
      return result;
    },
    { body: loginBodySchema },
  )
  .use(requireAuth)
  .get('/me', async ({ auth, set }) => {
    const result = await authService.getProfile(auth!.sub);
    if (isNotFound(result)) {
      set.status = 404;
    }
    return result;
  });
