import { Elysia } from 'elysia';
// import { healthController } from "../controllers/health.controller";

export const healthRoute = new Elysia({ prefix: '/health' }).get('/', () => {});
