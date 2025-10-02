import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import MarcoCard from "./cardComponents/MarcoCard"

function CartillaCard(props) {
    const prestacion = props.prestacion

  return (
    <MarcoCard>
        <ColumnaPrincipal>
            {prestacion.medico}
            {prestacion.especialidad}
            {`Lugar: ${prestacion.lugar}`}
            {`Dirección: ${prestacion.direccion}`}
            {`Telefono: ${prestacion.telefono}`}
        </ColumnaPrincipal>
    </MarcoCard>
  )
}

export default CartillaCard