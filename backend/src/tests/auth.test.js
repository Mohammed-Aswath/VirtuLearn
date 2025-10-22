/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Jest + Supertest skeleton tests for auth flows
 * BACKEND CONTRACT: /api/auth/register, /api/auth/login, /api/auth/me
 * TODO: Configure test database URI to enable integration tests in CI
 */

const request = require('supertest');
const app = require('../app');

// Run integration tests only when MONGODB_URI is available
const maybe = process.env.MONGODB_URI ? describe : describe.skip;

maybe('auth integration', () => {
  let token;
  const email = `test_${Date.now()}@example.com`;

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email, password: 'password123', role: 'student' });
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('logs in the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('returns current user (me)', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
  });
});


