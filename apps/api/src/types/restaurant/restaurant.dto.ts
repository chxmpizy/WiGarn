import { z } from 'zod';
import type { SelectRestaurant } from '@db/schema';

export const createRestaurantBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  address: z.string().min(1),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string(),
  website: z.string().nullable(),
  category: z.string(),
  imageUrl: z.string(),
});
export const updateRestaurantBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  category: z.string().optional(),
  website: z.string().nullable().optional(),
  imageUrl: z.string().optional(),
});
export const restaurantIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateRestaurantBody = z.infer<typeof createRestaurantBodySchema>;
export type UpdateRestaurantBody = z.infer<typeof updateRestaurantBodySchema>;

export interface Restaurant {
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
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toPublicRestaurant = (row: SelectRestaurant): Restaurant => ({
  id: row.id,
  name: row.name,
  description: row.description,
  address: row.address,
  city: row.city,
  state: row.state,
  postal_code: row.postal_code,
  country: row.country,
  phone: row.phone,
  website: row.website,
  category: row.category,
  image_url: row.image_url,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
