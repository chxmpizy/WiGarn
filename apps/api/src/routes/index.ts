import { Elysia } from "elysia";
import { healthRoute } from "./health.route";
import { restaurantsRoute } from "./restaurants/restaurants.route";
import { reviewsRoute } from "./reviews/reviews.route";
import { usersRoute } from "./users/users.route";

export const registerRoutes = new Elysia({ name: "routes" })
  .use(healthRoute)
  .use(restaurantsRoute)
  .use(reviewsRoute)
  .use(usersRoute);
