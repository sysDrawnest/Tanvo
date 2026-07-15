// services/api.ts
import axios from 'axios';
import { getValidToken } from '../utils/auth';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://tanvo.onrender.com/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Add token to requests if it exists
API.interceptors.request.use((req) => {
  const token = getValidToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - check if we actually had a valid token before clearing
      const hadToken = !!getValidToken();
      localStorage.removeItem('token');
      
      // Only redirect if they had a genuinely authenticated session that expired
      // AND they are trying to access a protected route (e.g. /profile, /checkout, /orders, /admin)
      const protectedPaths = ['/profile', '/checkout', '/orders', '/admin'];
      const isProtected = protectedPaths.some(path => 
        window.location.pathname === path || 
        window.location.pathname.startsWith(path + '/')
      );

      if (hadToken && isProtected && window.location.pathname !== '/auth' && window.location.pathname !== '/auth/') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

export const api = API;
export default API;