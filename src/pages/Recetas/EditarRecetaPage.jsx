import { useNavigate, useParams } from "react-router-dom";
import { useGetRecetaById } from "../../services/recetasQueries";
import EditarReceta from "./EditarReceta";
import SolicitarReceta from "./SolicitarReceta";

function EditarRecetaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recetaResponse, isLoading, isError } = useGetRecetaById(id);
  const receta = recetaResponse?.data; // accedemos a `data` interno

  if (isLoading) return <p>Cargando...</p>;

  if (isError || !receta) {
    navigate("/recetas/solicitar-receta");
    return null;
  }

  return (
    <EditarReceta
      receta={receta}
      cancelBtnOnClick={() => navigate("/recetas/ver-recetas")}
    />
  );
}

export default EditarRecetaPage;
