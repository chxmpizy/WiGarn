import 'dotenv/config';
import { Elysia } from 'elysia';
import { registerRoutes } from './routes';
import { db } from '@db/db';

export const createApp = () =>
  new Elysia({ name: 'wigarn-api' })
    .decorate('db', db)
    .get('/', () => ({
      message: 'WiGarn API',
    }))
    .use(registerRoutes);

if (import.meta.main) {
  const app = createApp();
  app.listen(process.env.API_PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.API_PORT || 3001}`);
  });
}
