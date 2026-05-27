import { Elysia } from 'elysia';
import { registerRoutes } from './routes';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });
export const createApp = () =>
  new Elysia({ name: 'wigarn-api' })
    .decorate('db', db)
    .get('/', () => ({ message: 'WiGarn API' }))
    .use(registerRoutes);
