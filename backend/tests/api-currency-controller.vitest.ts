import { it, expect } from 'vitest';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { login } from './helper/auth';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const base = process.env.API_BASE_URL || 'http://localhost:5000';
const client = axios.create({ baseURL: base, validateStatus: () => true });

it('can access currency route after login', async () => {
  const loginres = await login();
  const res = await client.get('/currency', { headers: { Cookie: loginres.headers['set-cookie'] } });
  expect(res.status).toBe(200);
});

it('cannot access currency route without login', async () => {
  const res = await client.get('/currency');
  expect(res.status).toBe(401);
});