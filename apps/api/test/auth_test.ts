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

  it('registers and returns an access token', async () => {
    const email = `auth-test-${Date.now()}@example.com`;
    const response = await app.handle(
      new Request('http://localhost/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Auth Test',
          email,
          password: 'password123',
        }),
      }),
    );

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.accessToken).toBeString();
    expect(data.user.email).toBe(email);
  });
});
