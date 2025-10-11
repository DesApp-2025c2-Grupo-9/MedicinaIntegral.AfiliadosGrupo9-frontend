import axios from '../api/axios';

export const getReintegros = async () => {
  const res = await axios.get('api/reintegros');
  return res.data;
};

export const createReintegro = async body => {
  const res = await axios.post('api/reintegros', body);
  return res.data;
};

export const updateReintegro = async body => {
  const res = await axios.put(`api/reintegros/${body.id}`, body.data);
  return res.data;
};

export const deleteReintegro = async id => {
  const res = await axios.delete(`api/reintegros/${id}`);
  return res.data;
};
