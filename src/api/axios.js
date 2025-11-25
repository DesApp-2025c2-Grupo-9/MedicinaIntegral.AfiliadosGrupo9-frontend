import axios from 'axios';


export async function obtenerMiCuenta() {
  const response = await axiosPrivate.get('/api/mi-cuenta');
  return response.data;
}

export const editarCbuApi = async (cbuEditado) => {
  const { idCbu, tipoDeCuenta, cuil, nombre, apellido } = cbuEditado;
  if (!idCbu) throw new Error("El id del CBU no está definido");

  const body = { tipoDeCuenta, cuil, nombre, apellido };
  const response = await axios.put(`http://localhost:3000/mi-cuenta/cbu-principal/${idCbu}`, body);

  return response.data;
}




export const eliminarCbuApi = async (idAfiliado, nroCBU) => {
  return axios.delete(`/api/mi-cuenta/cbu-principal/${idAfiliado}`, {
    data: { nroCbu: nroCBU }
  });
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

