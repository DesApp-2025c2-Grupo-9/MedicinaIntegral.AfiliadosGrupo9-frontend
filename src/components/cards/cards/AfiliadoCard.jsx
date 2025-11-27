import ModalSituacionTerapeutica from "../../ModalSituacionTerapeutica/ModalSituacionTerapeutica"
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import MarcoCard from "./cardComponents/MarcoCard"
import { useState } from "react"


function AfiliadoCard(props) {
    //Si no se pasa un afiliado por parámetro, se debe cargar el usuario del contexto, ya que es el actual
    const afiliado = props.afiliado
    const [situacionTerapeuticaOpen, setsituacionTerapeuticaOpen] = useState(false)
    /* const situacionTerapeuticaTexto = (
        afiliado.situacionTerapeutica.length > 0 ? (
            afiliado.situacionTerapeutica.join(', ') + '.'
        ) : ''
    ) */
   const situacionTerapeuticaTexto = afiliado.situacionTerapeutica
    return (<>
        <MarcoCard>
            <ColumnaPrincipal subtituloOn={false}>
                {afiliado.nombre}
                {`Nro. Afiliado: ${afiliado.nroAfiliado}`}
                {afiliado.nroAfiliado.slice(-2) === '01' ? `Plan médico: ${afiliado.planMedico}` : ''}
                {`DNI: ${afiliado.dni}`}
                {`Email: ${afiliado.email}`}

                <button className="text-xs text-blue-500 lg:hover:underline grid justify-items-start col-start-1 cursor-pointer" onClick={() => { setsituacionTerapeuticaOpen(!situacionTerapeuticaOpen) }}>
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
                    headerText='Volver a Mi cuenta'
                    prefix={null}
                />
            ) : (<></>)
        }
    </>
    )
}
export default AfiliadoCard;