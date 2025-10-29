//   enums
export const getEspecialidades = async (axiosClient) => {
  const res = await axiosClient.get("api/enums/especialidades");
  return res.data;
};

export const getLocalidades = async (axiosClient) => {
  const res = await axiosClient.get("api/enums/localidades");
  return res.data;
};

//  prestadores con o sin filtros
export const getPrestadores = async (axiosClient, filters = {}) => {
  const params = new URLSearchParams();

  if (filters.especialidad) params.append("especialidad", filters.especialidad);
  if (filters.localidad) params.append("localidad", filters.localidad);

  const url = params.toString()
    ? `api/prestadores?${params.toString()}`
    : `api/prestadores`;

  const res = await axiosClient.get(url);
  return res.data;
};
