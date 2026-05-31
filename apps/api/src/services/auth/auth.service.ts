import { eq } from 'drizzle-orm';
import { usersTable } from '../../../db/schema';
import { db } from '../../../db/db';
import { signAccessToken } from '../../lib/jwt';
import { hashPassword, verifyPassword } from '../../lib/password';
import type { LoginBody, RegisterBody } from '../../types/auth/auth.dto';
import { toPublicUser } from '../../types/user/user.dto';

const isUniqueViolation = (error: unknown) =>
  error instanceof Error &&
  'code' in error &&
  (error as { code: string }).code === '23505';

const issueSession = async (user: typeof usersTable.$inferSelect) => ({
  accessToken: await signAccessToken({
    sub: user.uuid,
    email: user.email,
    role: user.role,
  }),
  user: toPublicUser(user),
});

export const authService = {
  async register(body: RegisterBody) {
    const passwordHash = await hashPassword(body.password);

    try {
      const [row] = await db
        .insert(usersTable)
        .values({
          name: body.name,
          email: body.email,
          passwordHash,
          role: 'user',
          image_url: body.image_url,
        })
        .returning();

      return issueSession(row);
    } catch (error) {
      if (isUniqueViolation(error)) {
        return { message: 'Email already in use' as const };
      }
      throw error;
    }
  },

  async login(body: LoginBody) {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, body.email));

    if (!row) {
      return { message: 'Invalid email or password' as const };
    }

    const valid = await verifyPassword(body.password, row.passwordHash);
    if (!valid) {
      return { message: 'Invalid email or password' as const };
    }

    return issueSession(row);
  },

  async getProfile(uuid: string) {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.uuid, uuid));

    if (!row) {
      return { message: 'User not found' as const };
    }

    return toPublicUser(row);
  },
};
