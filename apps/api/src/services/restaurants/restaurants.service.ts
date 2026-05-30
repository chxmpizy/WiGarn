import { eq } from 'drizzle-orm';
import { restaurantsTable } from '../../../db/schema';
import { db } from '../../../db/db';
import {
  type CreateRestaurantBody,
  type UpdateRestaurantBody,
  toPublicRestaurant,
} from '../../types/restaurant/restaurant.dto';

const isUniqueViolation = (error: unknown) =>
  error instanceof Error &&
  'code' in error &&
  (error as { code: string }).code === '23505';

const toInsertValues = (body: CreateRestaurantBody) => ({
  name: body.name,
  description: body.description,
  address: body.address,
  city: body.city,
  state: body.state,
  postal_code: body.postalCode,
  country: body.country,
  phone: body.phone,
  website: body.website,
  image_url: body.imageUrl,
});

const toUpdateValues = (body: UpdateRestaurantBody) => ({
  ...(body.name !== undefined && { name: body.name }),
  ...(body.description !== undefined && { description: body.description }),
  ...(body.address !== undefined && { address: body.address }),
  ...(body.city !== undefined && { city: body.city }),
  ...(body.state !== undefined && { state: body.state }),
  ...(body.postalCode !== undefined && { postal_code: body.postalCode }),
  ...(body.country !== undefined && { country: body.country }),
  ...(body.phone !== undefined && { phone: body.phone }),
  ...(body.website !== undefined && { website: body.website }),
  ...(body.imageUrl !== undefined && { image_url: body.imageUrl }),
});

export const restaurantService = {
  async getAllRestaurants() {
    const rows = await db.select().from(restaurantsTable);
    return rows.map(toPublicRestaurant);
  },

  async getRestaurantById(id: number) {
    const [row] = await db
      .select()
      .from(restaurantsTable)
      .where(eq(restaurantsTable.id, id));

    if (!row) {
      return { message: 'Restaurant not found' as const };
    }

    return toPublicRestaurant(row);
  },

  async createRestaurant(body: CreateRestaurantBody) {
    try {
      const [row] = await db
        .insert(restaurantsTable)
        .values(toInsertValues(body))
        .returning();

      return toPublicRestaurant(row);
    } catch (error) {
      if (isUniqueViolation(error)) {
        return { message: 'Restaurant already exists' as const };
      }
      throw error;
    }
  },

  async updateRestaurant(body: UpdateRestaurantBody, id: number) {
    try {
      const [row] = await db
        .update(restaurantsTable)
        .set(toUpdateValues(body))
        .where(eq(restaurantsTable.id, id))
        .returning();

      if (!row) {
        return { message: 'Restaurant not found' as const };
      }

      return toPublicRestaurant(row);
    } catch (error) {
      if (isUniqueViolation(error)) {
        return { message: 'Restaurant already exists' as const };
      }
      throw error;
    }
  },

  async deleteRestaurant(id: number) {
    const [row] = await db
      .delete(restaurantsTable)
      .where(eq(restaurantsTable.id, id))
      .returning({ id: restaurantsTable.id });

    if (!row) {
      return { message: 'Restaurant not found' as const };
    }

    return { message: 'Restaurant deleted', id: row.id };
  },
};
