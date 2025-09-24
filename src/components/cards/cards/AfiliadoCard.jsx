import CampoInformacion from "./cardComponents/CampoInformacion"
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import MarcoCard from "./cardComponents/MarcoCard"
import TituloCard from "./cardComponents/TituloCard"

function AfiliadoCard(props) {
    //Si no se pasa un afiliado por parámetro, se debe cargar el usuario del contexto, ya que es el actual
    const afiliado = props.afiliado

    const campos = [
        `Nro. Afiliado: ${afiliado.nroAfiliado}`,
        //Si es el afiliado 01 muestra el plan, de lo contrario no lo muestra
        afiliado.nroAfiliado.slice(-2) === '01' ? `Plan médico: ${afiliado.planMedico}` : '',
        `DNI: ${afiliado.dni}`,
        `Email: ${afiliado.email}`
    ]

    return (
        <MarcoCard>
            <ColumnaPrincipal>
                <TituloCard>{afiliado.nombre}</TituloCard>
                {campos.map(
                    (textoCampo, index) =>
                        <CampoInformacion key={index}>{textoCampo}</CampoInformacion>
                )}
                <button className="text-xs text-blue-500 grid justify-items-start col-start-1" onClick={() => {alert(afiliado.situacionTerapeutica)}}>
                    Situación terapeutica
                </button>
            </ColumnaPrincipal>
        </MarcoCard>
    )
}
export default AfiliadoCard;