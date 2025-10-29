import api from '../api/api';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  tenantId: number;
  sub: string;
  exp: number;
}

export interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string) {
  const res = await api.post<LoginResponse>('/auth/login', { username, password });
  const token = res.data.token;

  // Store JWT
  localStorage.setItem('token', token);

  // Extract tenantId from JWT
  const decoded: JwtPayload = jwtDecode(token);
  localStorage.setItem("tenantId", decoded.tenantId.toString());

  return decoded;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('tenantId');
}
