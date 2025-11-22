import axios from '../api/axios';

// Registro & Sesión
export const register = async body => {
  const res = await axios.post('api/auth/register', body);
  return res.data;
};

export const login = async body => {
  const res = await axios.post('api/auth/login', body, { withCredentials: true });
  return res.data;
};

export const logout = async () => {
  const res = await axios.get('api/auth/logout', { withCredentials: true });
  return res.data;
};

// Afiliados
export const getAfiliado = async axiosClient => {
  const res = await axiosClient.get('api/afiliados');
  return res.data;
};

// Reintegros
export const getReintegros = async (axiosClient, idAfiliado) => {
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

export const deleteReintegro = async (axiosClient, idReintegro) => {
  const res = await axiosClient.patch(`api/reintegros/${idReintegro}`);
  return res.data;
};

export const commentReintegroById = async (axiosClient, body) => {
  const res = await axiosClient.post(`api/reintegros/${body.id}`, body);
  return res.data;
};

// Especialidades
export const getEspecialidades = async axiosClient => {
  const res = await axiosClient.get('api/especialidades');
  return res.data;
};
