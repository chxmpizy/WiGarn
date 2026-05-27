/** API-local types until shared types live in packages/types */

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  passwordHash: string | null;
  role: UserRole;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  postalCode: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  imageUrl: string | null;
  priceLevel: 1 | 2 | 3 | 4 | null;
  /** Cached aggregate — recompute on review create/update/delete */
  avgRating: number | null;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  /** 1–5 stars */
  rating: 1 | 2 | 3 | 4 | 5;
  title: string | null;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewPhoto {
  id: string;
  reviewId: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: Date;
}

// export interface Cuisine {
//   id: string;
//   name: string;
//   createdAt: Date;
// }

// export interface RestaurantCuisine {
//   restaurantId: string;
//   cuisineId: string;
// }

// /** One review per user per restaurant */
// export type CreateReviewInput = Pick<
//   Review,
//   "restaurantId" | "rating" | "title" | "body"
// >;

// export type UpdateReviewInput = Partial<
//   Pick<Review, "rating" | "title" | "body">
// >;
