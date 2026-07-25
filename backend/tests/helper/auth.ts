import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const base = process.env.API_BASE_URL || 'http://localhost:5000';
const client = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' }, validateStatus: () => true });

export async function login(): Promise<any | null> {
  const res = await client.post('/home/login', {
    email: process.env.TESTINGUSERNAME,
    password: process.env.TESTINGPASSWORD
  });

  return res;
}