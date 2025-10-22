/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Jest sample tests for health and basic auth
 * BACKEND CONTRACT: N/A
 */

const request = require('supertest');
const app = require('../app');

describe('health', () => {
  it('responds', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});


