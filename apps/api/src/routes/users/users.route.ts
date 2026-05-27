import { Elysia } from "elysia";

/** User REST routes — wire handlers via users.controller */
export const usersRoute = new Elysia({ prefix: "/users" });
