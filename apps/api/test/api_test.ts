import { it, describe, expect } from 'bun:test';
import { createApp } from '../src/index';
const app = createApp();

describe('API TEST', () => {
  it('should return normal response', async () => {
    const response = await app.handle(new Request('http://localhost/'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('WiGarn API');
  });
});
