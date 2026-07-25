import { it, expect } from 'vitest';
import axios from 'axios';

const base = process.env.API_BASE_URL || 'http://localhost:5000';
const client = axios.create({ baseURL: base, validateStatus: () => true });

it('GET /home/test returns a successful health response', async () => {
  const res = await client.get('/home/test');
  expect(res.status).toBe(200);
  expect(res.data).toEqual({ message: 'Test endpoint working' });
});