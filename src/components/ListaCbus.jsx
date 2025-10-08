import MarcoCard from "./cards/cards/cardComponents/MarcoCard"
import BodyTabla from "./Tablas/BodyTabla"
import HeaderTabla from "./Tablas/HeaderTabla"
import RowTabla from "./Tablas/RowTabla"
import Tabla from "./Tablas/Tabla"
import { icons } from "../utils/icons"

/*
    Recibe una lista de CBUs del usuario
        Si la lista está vacia muestra un mensaje diciendo que no hay CBU registrado
        Si la lista tiene CBUs los lista
*/
const editarCBU = () => {
    alert('Editar CBU')
}

const eliminarCBU = () => {
    alert('Eliminar CBU')

}

function ListaCbus({ listaCbus }) {
    const editar = (
    <button 
    className="text-blue-500 h-5 flex gap-1 cursor-pointer hover:text-blue-600"
    onClick={editarCBU}>
        {icons.editar}
        Editar
    </button>)
    const eliminar = (
    <button 
    className="text-red-500 h-5 flex gap-1 cursor-pointer hover:text-red-600"
    onClick={eliminarCBU}
    >
        {icons.papelera}
        Eliminar
    </button>)

    return (
        <div className="grid grid-cols-1">
            {
                listaCbus.length > 0 ? (//Mostrar los CBU
                    <Tabla>
                        <HeaderTabla headers={['N° CBU', 'Titular']} />
                        <BodyTabla>
                            {listaCbus.map(
                                (cbu, index) => <RowTabla head={cbu[1]} content={[cbu[0], editar, eliminar]} key={cbu[1]} index={index} />
                            )}
                        </BodyTabla>
                    </Tabla>
                ) : (//Mostrar el menasje que no hay CBU
                    <MarcoCard className="font-bold">
                        No tiene un CBU registrado.
                    </MarcoCard>
                )
            }
        </div>
    )
}

export default ListaCbus