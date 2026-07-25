import { it, expect } from 'vitest';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const base = process.env.API_BASE_URL || 'http://localhost:5000';
const client = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' }, validateStatus: () => true });

it('test login with empty username and password', async () => {
  const res = await client.post('/home/login', { email: '', password: '' });
  expect(res.status).toBe(400);
  expect(res.data).toEqual({ message: 'Missing parameters' });
});

it('test login with invalid username and password', async () => {
  const res = await client.post('/home/login', { email: 'invalid@example.com', password: 'wrongpassword' });
  expect(res.status).toBe(401);
  expect(res.data).toEqual({ message: 'Invalid credentials' });
});

it('test login with wrong password', async () => {
  const res = await client.post('/home/login', { email: process.env.TESTINGUSERNAME, password: 'wrongpassword' });
  expect(res.status).toBe(401);
  expect(res.data).toEqual({ message: 'Invalid credentials' });
});

it('test login with correct username and password', async () => {
  const res = await client.post('/home/login', { email: process.env.TESTINGUSERNAME, password: process.env.TESTINGPASSWORD });
  expect(res.status).toBe(200);
  expect(res.data).toHaveProperty('userToReturn');
  expect(res.data.userToReturn).toHaveProperty('_id');
  expect(res.data.userToReturn).toHaveProperty('name');
  expect(res.data.userToReturn).toHaveProperty('email');
  expect(res.data.userToReturn.email).toBe(process.env.TESTINGUSERNAME);
});