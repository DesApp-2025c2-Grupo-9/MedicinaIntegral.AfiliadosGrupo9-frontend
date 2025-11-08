import axios from '../api/axios';
import axiosPrivate from '../api/axios';

// Registro
export const register = async body => {
  const res = await axios.post('api/auth/register', body);
  return res.data;
};

// Sesión
export const login = async body => {
  const res = await axios.post('api/auth/login', body, { withCredentials: true });
  return res.data;
};

export const logout = async () => {
  const res = await axios.get('api/auth/logout', { withCredentials: true });
  return res.data;
};

//Mi cuenta
export async function obtenerMiCuenta() {
  const response = await axiosPrivate.get('/api/auth/mi-cuenta');
  return response.data;
}

// Afiliados
export const getAfiliado = async axiosClient => {
  const res = await axiosClient.get('api/afiliados');
  return res.data;
};

// Reintegros
export const getReintegros = async (axiosClient, idAfiliado) => {
  throw new Error('Error 404'); // Error para testear TramitesFallback Component; cambiar mensaje a 'Error 401' para testear MainFallback Component;
  const res = await axiosClient.get(`api/reintegros/${idAfiliado}`);
  return res.data;
};

export const createReintegro = async (axiosClient, body) => {
  const res = await axiosClient.post('api/reintegros', body);
  return res.data;
};

export const updateReintegro = async (axiosClient, body) => {
  const res = await axiosClient.put(`api/reintegros/${body.id}`, body.data);
  return res.data;
};

export const deleteReintegro = async (axiosClient, id) => {
  const res = await axiosClient.patch(`api/reintegros/${id}`);
  return res.data;
};

export const commentReintegroById = async (axiosClient, body) => {
  const res = await axiosClient.post(`api/reintegros/${body.id}`, body);
  return res.data;
};

// Especialidades
export const getEspecialidades = async () => {
  const res = await axios.get('api/especialidades');
  return res.data;
};
