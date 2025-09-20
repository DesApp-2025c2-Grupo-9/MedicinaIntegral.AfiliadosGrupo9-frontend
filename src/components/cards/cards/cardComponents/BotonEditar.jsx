import { icons } from "../../../../utils/icons";
function BotonEditar(props) {
  //Se debe cargar la posición para que quede al final de la card
  let posicion = `col-start-2 row-start-${props.posicion} justify-items-end`;
  return (
    <div className={posicion}>
      <button
        className="flex flex-row text-blue-500 hover:text-blue-600 p-1 justify-end"
        onClick={props.onClick}
      >
        <span className="text-xs mr-1">Editar</span>
        <span className="w-5 h-4">{icons.editar}</span>
      </button>
    </div>
  );
}

export default BotonEditar;
