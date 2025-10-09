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

  
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2">
      {recetas.map(
        (receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        )
      )}
    </div>
  )
}

export default VerRecetas