// tests/redisClient.test.js
import redisClient from '../utils/redis';
import { clearCache } from './testUtils';

describe('redisClient', () => {
  beforeEach(async () => {
    await clearCache();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it('should set and get data from cache', async () => {
    const key = 'testKey';
    const value = 'testValue';

    await redisClient.set(key, value);

    const result = await redisClient.get(key);
    expect(result).toBe(value);
  });

  it('should handle cache expiration', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const expirationTime = 1; // seconds

    await redisClient.setex(key, expirationTime, value);

    // Wait for expiration
    await new Promise((resolve) => setTimeout(resolve, (expirationTime + 1) * 1000));

    const result = await redisClient.get(key);
    expect(result).toBeNull();
  });
});
