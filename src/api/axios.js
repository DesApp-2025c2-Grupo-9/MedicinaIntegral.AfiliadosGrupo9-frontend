import axios from 'axios';


export async function obtenerMiCuenta() {
  const response = await axiosPrivate.get('/api/mi-cuenta');
  return response.data;
}

export const editarCbuApi = async (cbuEditado) => {
  const { cbu, tipoDeCuenta, cuil, nombre, apellido } = cbuEditado;
  const body = { tipoDeCuenta, cuil, nombre, apellido };
  const response = await axiosPrivate.put(`/api/mi-cuenta/cbu/${cbu}`, body);
  return response.data;
};


export const eliminarCbuApi = async (nroCBU) => {
  const response = await axiosInstance.delete(`/cbu/${nroCBU}`);
  return response.data;
};



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

