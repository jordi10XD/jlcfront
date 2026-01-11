import axios from 'axios';

// Asegúrate de que esta URL coincida con la de tu backend (Laravel)
// Si usas 'php artisan serve', por defecto es http://localhost:8000
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.jlctecnology.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Importante para Sanctum SPA auth si usas cookies, o para CORS
});

// Interceptor para añadir el token a cada petición
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
