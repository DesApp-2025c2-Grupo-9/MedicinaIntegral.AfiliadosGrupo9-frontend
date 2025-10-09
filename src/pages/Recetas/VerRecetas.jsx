import RecetaCard from "../../components/cards/cards/RecetaCard";
import { useStateFilter } from "../../store/stateFilter"


function VerRecetas() {
  const { filterState } = useStateFilter();

  const recetas = [{
    idReceta: 1,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'Pendiente'
  },
  {
    idReceta: 2,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'Pendiente'
  },
  {
    idReceta: 3,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'Rechazado'
  },
  {
    idReceta: 4,
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'Aceptado'
  }
  ]

  
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {recetas.map(
        (receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        )
      )}
    </div>
  )
}

export default VerRecetas