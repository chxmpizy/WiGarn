import { z } from 'zod';
import type { SelectUser } from '../../../db/schema';

export type UserRole = 'user' | 'admin';
export const userRoleSchema = z.enum(['user', 'admin']);

export const createUserBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  role: userRoleSchema.optional(),
  image_url: z.string().optional(),
});

export const updateUserBodySchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.email().optional(),
    password: z.string().min(8).optional(),
    role: userRoleSchema.optional(),
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
  image_url: string | null;
  role: UserRole;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toPublicUser = (row: SelectUser): User => ({
  uuid: row.uuid,
  email: row.email,
  name: row.name,
  image_url: row.image_url,
  role: row.role as UserRole,
  emailVerifiedAt: row.emailVerifiedAt,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
