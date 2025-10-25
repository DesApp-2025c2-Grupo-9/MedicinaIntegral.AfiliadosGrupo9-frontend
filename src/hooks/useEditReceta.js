import useAxiosPrivate from "./useAxiosPrivate";

const useEditReceta = () => {
  const axiosPrivate = useAxiosPrivate();

  const editReceta = async (recetaId, formData) => {
    const response = await axiosPrivate.put(`/recetas/${recetaId}`, formData);
    return response.data;
  };

  return { editReceta };
};

export default useEditReceta;
