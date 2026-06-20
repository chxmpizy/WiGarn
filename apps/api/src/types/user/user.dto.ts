import { z } from 'zod';
import type { SelectUser } from '@db/schema';

export type UserRole = 'user' | 'admin';
export const userRoleSchema = z.enum(['user', 'admin']);

export const createUserBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  handle: z.string().min(1).max(64).optional(),
  location: z.string().max(255).optional(),
  bio: z.string().max(200).optional(),
  image_url: z.string().optional(),
});

export const updateUserBodySchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.email().optional(),
    password: z.string().min(8).optional(),
    handle: z.string().min(1).max(64).optional(),
    location: z.string().max(255).optional(),
    bio: z.string().max(200).optional(),
    image_url: z.string().optional(),
  })
  .refine((body) => Object.keys(body).length > 0, {
    message: 'At least one field is required',
  });

export const userUuidParamsSchema = z.object({
  uuid: z.string().uuid(),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;

export interface User {
  uuid: string;
  email: string;
  name: string;
  handle: string | null;
  location: string | null;
  bio: string | null;
  image_url: string | null;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toPublicUser = (row: SelectUser): User => ({
  uuid: row.uuid,
  email: row.email,
  name: row.name,
  handle: row.handle,
  location: row.location,
  bio: row.bio,
  image_url: row.image_url,
  emailVerifiedAt: row.emailVerifiedAt,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
