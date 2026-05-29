import { Elysia } from 'elysia';
import { registerRoutes } from './routes';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

export const createApp = () =>
  new Elysia({ name: 'wigarn-api' })
    .decorate('db', db)
    .get('/', () => ({
      message: 'WiGarn API',
    }))
    .use(registerRoutes);

const app = createApp();
app.listen(process.env.API_PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.API_PORT || 3001}`);
});
