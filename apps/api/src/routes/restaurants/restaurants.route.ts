import { Elysia } from "elysia";

/** Restaurant REST routes — wire handlers via restaurants.controller */
export const restaurantsRoute = new Elysia({ prefix: "/restaurants" });
