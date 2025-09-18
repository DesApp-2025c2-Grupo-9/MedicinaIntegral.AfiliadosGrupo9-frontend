import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import BotonPapelera from "./cardComponents/BotonPapelera"
import UsuarioActual from "./cardComponents/UsuarioActual"
import BotonEditar from "./cardComponents/BotonEditar"
import BotonObservaciones from "./cardComponents/BotonObservaciones"

function RecetaCard(props) {
  let receta = props.receta
  return (
    //Card
    <div className="grid grid-cols-2 grid-rows-1 m-3 p-4 bg-white rounded-xl shadow-md border border-gray-200 max-w-md min-w-sm">
      {/*Datos de la receta*/}
      <ColumnaPrincipal
        titulo={receta.medicamento}
        subtitulo={receta.cantidad}
        campo1={receta.presentacion}
        campo2={receta.detalleMedicamento}
        campos={2}
      />
      <div className="grid grid-rows-4">

        <UsuarioActual />
        {/*Según es estado de la receta, varía la sección derecha de la card receta */}
        {receta.pendiente ? (
          <>
            <BotonEditar posicion={3} />
            <BotonPapelera posicion={4} />
          </>
        ) : <BotonObservaciones/>
        }
      </div>

    </div>
  )
}

export default RecetaCard