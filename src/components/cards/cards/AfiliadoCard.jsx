import ModalSituacionTerapeutica from "../../ModalSituacionTerapeutica/ModalSituacionTerapeutica"
import CampoInformacion from "./cardComponents/CampoInformacion"
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import MarcoCard from "./cardComponents/MarcoCard"
import TituloCard from "./cardComponents/TituloCard"
import { useState } from "react"


function AfiliadoCard(props) {
    //Si no se pasa un afiliado por parámetro, se debe cargar el usuario del contexto, ya que es el actual
    const afiliado = props.afiliado
    const [situacionTerapeuticaOpen, setsituacionTerapeuticaOpen] = useState(false)
    const campos = [
        `Nro. Afiliado: ${afiliado.nroAfiliado}`,
        //Si es el afiliado 01 muestra el plan, de lo contrario no lo muestra
        afiliado.nroAfiliado.slice(-2) === '01' ? `Plan médico: ${afiliado.planMedico}` : '',
        `DNI: ${afiliado.dni}`,
        `Email: ${afiliado.email}`
    ]
    const situacionTerapeuticaTexto = (
        afiliado.situacionTerapeutica.length > 0 ? (
            afiliado.situacionTerapeutica.join(', ') + '.'
        ) : ''
    )
    return (<>
        <MarcoCard>
            <ColumnaPrincipal>
                <TituloCard>{afiliado.nombre}</TituloCard>
                {campos.map(
                    (textoCampo, index) =>
                        <CampoInformacion key={index}>{textoCampo}</CampoInformacion>
                )}
                <button className="text-xs text-blue-500 grid justify-items-start col-start-1" onClick={() => { setsituacionTerapeuticaOpen(!situacionTerapeuticaOpen) }}>
                    Situación terapeutica
                </button>
            </ColumnaPrincipal>
        </MarcoCard>
        {
            situacionTerapeuticaOpen ? (
                <ModalSituacionTerapeutica
                    open={situacionTerapeuticaOpen}
                    onClose={() => { setsituacionTerapeuticaOpen(!situacionTerapeuticaOpen) }}
                    nombreUsuario={afiliado.nombre}
                    diagnosticoTexto={situacionTerapeuticaTexto}
                />
            ) : (<></>)
        }
    </>
    )
}
export default AfiliadoCard;