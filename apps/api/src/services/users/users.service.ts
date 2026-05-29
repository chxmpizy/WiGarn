/** User business logic — use @repo/db when packages/db is available */
import { eq } from 'drizzle-orm';
import { usersTable } from '../../../db/schema';
import { db } from '../../../db/db';
import {
  type CreateUserBody,
  type UpdateUserBody,
  toPublicUser,
} from '../../types/user/user.dto';

const hashPassword = (password: string) =>
  Bun.password.hash(password, { algorithm: 'bcrypt', cost: 10 });

const isUniqueViolation = (error: unknown) =>
  error instanceof Error &&
  'code' in error &&
  (error as { code: string }).code === '23505';

export const userServices = {
  async getAllUsers() {
    const rows = await db.select().from(usersTable);
    return rows.map(toPublicUser);
  },
  async getUserByUid(uuid: string) {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.uuid, uuid));

    if (!row) {
      return { message: 'User not found' as const };
    }

    return toPublicUser(row);
  },
  async createUser(body: CreateUserBody) {
    const passwordHash = await hashPassword(body.password);
    try {
      const [row] = await db
        .insert(usersTable)
        .values({
          name: body.name,
          email: body.email,
          passwordHash,
          role: body.role ?? 'user',
          image_url: body.image_url,
        })
        .returning();
      return toPublicUser(row);
    } catch (error) {
      if (isUniqueViolation(error)) {
        return { message: 'Email already in use' as const };
      }
      throw error;
    }
  },
  async updateUser(body: UpdateUserBody, uuid: string) {
    const passwordHash =
      body.password !== undefined
        ? await hashPassword(body.password)
        : undefined;
    try {
      const [row] = await db
        .update(usersTable)
        .set({
          ...(body.name !== undefined && { name: body.name }),
          ...(body.email !== undefined && { email: body.email }),
          ...(body.role !== undefined && { role: body.role }),
          ...(body.image_url !== undefined && { image_url: body.image_url }),
          ...(passwordHash !== undefined && { passwordHash }),
        })
        .where(eq(usersTable.uuid, uuid))
        .returning();

      if (!row) {
        return { message: 'User not found' as const };
      }

      return toPublicUser(row);
    } catch (error) {
      if (isUniqueViolation(error)) {
        return { message: 'Email already in use' as const };
      }
      throw error;
    }
  },
  async deleteUser(uuid: string) {
    const [row] = await db
      .delete(usersTable)
      .where(eq(usersTable.uuid, uuid))
      .returning({ uuid: usersTable.uuid });
    if (!row) {
      //   set.status = 404;
      return { message: 'User not found' };
    }

    return { message: 'User deleted', uuid: row.uuid };
  },
};
