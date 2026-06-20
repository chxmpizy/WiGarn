import { beforeAll, describe, expect, it } from 'bun:test';
import { createApp } from '../src/index';

beforeAll(() => {
  process.env.JWT_SECRET ??= 'test-jwt-secret-for-unit-tests';
});

const app = createApp();

describe('Auth', () => {
  it('rejects /auth/me without a token', async () => {
    const response = await app.handle(new Request('http://localhost/auth/me'));
    expect(response.status).toBe(401);
  });

  it('validates signup input before reaching the database', async () => {
    const response = await app.handle(
      new Request('http://localhost/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Auth Test',
          email: 'not-an-email',
          password: 'short',
        }),
      }),
    );

    expect(response.status).toBe(422);
  });
});
