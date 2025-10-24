import axios from '../api/axios';

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

// Afiliados
export const getAfiliado = async axiosClient => {
  const res = await axiosClient.get('api/afiliados');
  return res.data;
};

// Reintegros
export const getReintegros = async axiosClient => {
  const res = await axiosClient.get('api/reintegros');
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

// Especialidades
export const getEspecialidades = async () => {
  const res = await axios.get('api/especialidades');
  return res.data;
};
