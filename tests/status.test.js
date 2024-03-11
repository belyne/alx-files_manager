// tests/status.test.js
import request from 'supertest';
import app from '../server';

describe('GET /status', () => {
  it('should return 200 and status "OK"', async () => {
    const response = await request(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });
});
