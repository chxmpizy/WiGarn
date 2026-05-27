import { Elysia } from "elysia";

/** Review REST routes — wire handlers via reviews.controller */
export const reviewsRoute = new Elysia({ prefix: "/reviews" });
