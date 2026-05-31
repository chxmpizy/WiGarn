import { Elysia } from 'elysia';
import {
  getBearerToken,
  verifyAccessToken,
  type AuthJwtPayload,
} from '../lib/jwt';

/** Validates Bearer JWT and attaches `auth` to the request context. */
export const requireAuth = new Elysia({ name: 'require-auth' })
  .derive({ as: 'scoped' }, async ({ headers }) => {
    const token = getBearerToken(headers.authorization);
    if (!token) {
      return { auth: null as AuthJwtPayload | null };
    }

    try {
      const auth = await verifyAccessToken(token);
      return { auth };
    } catch {
      return { auth: null as AuthJwtPayload | null };
    }
  })
  .onBeforeHandle(({ auth, set }) => {
    if (!auth) {
      set.status = 401;
      return { message: 'Unauthorized' };
    }
  });
