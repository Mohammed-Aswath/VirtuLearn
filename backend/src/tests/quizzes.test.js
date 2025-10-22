/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Jest + Supertest skeleton tests for quizzes endpoints
 * BACKEND CONTRACT: /api/quizzes list/detail
 * TODO: Add attempt/analysis tests after test DB bootstrapping
 */

const request = require('supertest');
const app = require('../app');

describe('quizzes basic', () => {
  it('lists quizzes (no DB required if seeded)', async () => {
    const res = await request(app).get('/api/quizzes');
    expect([200, 204]).toContain(res.status);
  });
});


