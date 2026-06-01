import {
  integer,
  decimal,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const ratingEnum = pgEnum('rating_values', ['1', '2', '3', '4', '5']);

export const usersTable = pgTable('users', {
  uuid: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user'),
  image_url: varchar({ length: 255 }),
  emailVerifiedAt: timestamp(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const restaurantsTable = pgTable('restaurants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  address: varchar({ length: 255 }),
  city: varchar({ length: 255 }),
  state: varchar({ length: 255 }),
  postal_code: varchar({ length: 255 }),
  country: varchar({ length: 255 }),
  phone: varchar({ length: 255 }),
  website: varchar({ length: 255 }),
  image_url: varchar({ length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const review = pgTable('review', {
  id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  user_id: uuid('userId')
    .notNull()
    .references(() => usersTable.uuid),
  rest_id: integer('restaurantId')
    .notNull()
    .references(() => restaurantsTable.id),
  review_des: varchar().notNull(),
  rating: ratingEnum('rating').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertRestaurant = typeof restaurantsTable.$inferInsert;
export type SelectRestaurant = typeof restaurantsTable.$inferSelect;

export type InsertReview = typeof review.$inferInsert;
export type SelectReview = typeof review.$inferSelect;
