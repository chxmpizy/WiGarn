export interface RestaurantType {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  website: string | null;
  image_url: string | null;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  distance?: string;
}

export interface ReviewType {
  id: number;
  user_id: string;
  rest_id: number;
  review_des: string;
  rating: number;
  createdAt?: string;
  user: {
    name: string;
    image_url: string | null | undefined;
  } | null;
}

export interface UserType {
  uuid: string;
  email: string;
  name: string;
  handle: string | null;
  location: string | null;
  bio: string | null;
  image_url: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserReviewType {
  id: number;
  user_id: string;
  rest_id: number;
  rating: number;
  review_des: string;
  createdAt: string;
  updatedAt: string;
  restaurant: {
    id: number;
    name: string;
    category: string | null;
    image_url: string | null;
    city: string | null;
    state: string | null;
  } | null;
}
