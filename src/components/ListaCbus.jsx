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
function ListaCbus({ listaCbus }) {
    const editar = (
        <div className="text-blue-600 h-5 grid grid-rows-1 grid-cols-2 cursor-pointer">
                    <div >
                        {icons.editar}
                    </div>
                     <div>
                        Editar
                    </div>
                </div>
        )
    const eliminar = (
                <div className="text-red-600 h-5 flex">
                    {icons.papelera}
                    Eliminar
                </div>
            )

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
            {
                listaCbus.length > 0 ? (//Mostrar los CBU
                    <Tabla>
                        <HeaderTabla headers={['N° CBU', 'Titular']} />
                        <BodyTabla>
                            {listaCbus.map(
                                (cbu, index) => <RowTabla head={cbu[1]} content={[cbu[0], editar, eliminar]} key={cbu} index={index} />
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