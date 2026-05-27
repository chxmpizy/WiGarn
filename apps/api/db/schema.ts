import { integer, pgTable, varchar ,timestamp} from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user'),
  emailVerifiedAt: timestamp(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
