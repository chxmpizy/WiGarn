import { Elysia } from 'elysia';
import { authRoute } from '@/src/routes/auth/auth.route';
import { healthRoute } from './health.route';
import { restaurantsRoute } from './restaurants/restaurants.route';
import { reviewRoute } from './reviews';
import { usersRoute } from './users/users.route';
import { cors } from '@elysia/cors';

export const registerRoutes = new Elysia({ name: 'routes' })
  .use(cors())
  .use(healthRoute)
  .use(authRoute)
  .use(restaurantsRoute)
  .use(reviewRoute)
  .use(usersRoute);
