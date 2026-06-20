import { z } from 'zod';
import type { User } from '../user/user.dto';

export const registerBodySchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  handle: z.string().min(1).max(64).optional(),
  location: z.string().max(255).optional(),
  bio: z.string().max(200).optional(),
  image_url: z.string().optional(),
});

export const loginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;

export interface AuthSession {
  accessToken: string;
  user: User;
}
