import axios from 'axios';


export async function obtenerMiCuenta() {
  const response = await axiosPrivate.get('/api/mi-cuenta');
  return response.data;
}


const BASE_URL = 'http://localhost:3000';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

