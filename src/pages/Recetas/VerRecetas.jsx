import RecetaCard from "../../components/cards/cards/RecetaCard";
import { useStateFilter } from "../../store/stateFilter"
import FiltroEstados from '../../components/FiltroEstados'
import { useGetRecetasFamilia } from "../../services/recetasQueries";


function VerRecetas() {
  const { state } = useStateFilter();
  //Llamada a la API
  //Obtener el nro de afiliado general del grupo familiar/Usuario
  //const nroGrupoFamiliar = provider
  //const {data,error, isLoading} = useGetRecetaFamilia(nroGrupoFamiliar);
  //const recetas = data?.data

  const recetas = [{
    idReceta: 1,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'pendiente'
  },
  {
    idReceta: 2,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'pendiente'
  },
  {
    idReceta: 3,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'rechazado'
  },
  {
    idReceta: 4,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'aceptado'
  }
  ]
  
  const recetasFiltradas = recetas?.filter(
    receta => state.includes(receta.estado) || state === 'Todos'
  )
  
  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados className='sm:absolute -top-11 mr-auto'/>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2 w-full">
      {recetasFiltradas.map(
        (receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        )
      )}
    </div>
      </div>
  )
}

export default VerRecetas