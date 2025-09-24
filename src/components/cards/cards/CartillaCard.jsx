import CampoInformacion from "./cardComponents/CampoInformacion"
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import MarcoCard from "./cardComponents/MarcoCard"
import SubTituloCard from "./cardComponents/SubTituloCard"
import TituloCard from "./cardComponents/TituloCard"

function CartillaCard(props) {
    const prestacion = props.prestacion
    const campos = [
        `Lugar: ${prestacion.lugar}`,
        `Dirección: ${prestacion.direccion}`,
        `Telefono: ${prestacion.telefono}`
    ]


  return (
    <MarcoCard>
        <ColumnaPrincipal>
            <TituloCard>{prestacion.medico}</TituloCard>
            <SubTituloCard>{prestacion.especialidad}</SubTituloCard>
            {
                campos.map(
                    (campoTexto, index) =>
                        <CampoInformacion key={index}>{campoTexto}</CampoInformacion>
                )
            }
        </ColumnaPrincipal>
    </MarcoCard>
  )
}

export default CartillaCard