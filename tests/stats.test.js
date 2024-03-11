// tests/stats.test.js
import request from 'supertest';
import app from '../server';

describe('GET /stats', () => {
  it('should return 200 and stats', async () => {
    const response = await request(app).get('/stats');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(response.body).toHaveProperty('files');
  });
});
