/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Jest + Supertest skeleton tests for experiments endpoints
 * BACKEND CONTRACT: /api/experiments list
 * TODO: Add assign/create tests with auth when test DB ready
 */

const request = require('supertest');
const app = require('../app');

describe('experiments basic', () => {
  it('lists experiments', async () => {
    const res = await request(app).get('/api/experiments');
    expect([200, 204]).toContain(res.status);
  });
});


