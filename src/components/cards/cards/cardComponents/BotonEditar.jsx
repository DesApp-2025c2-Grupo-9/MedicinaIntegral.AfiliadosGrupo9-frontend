import { icons } from "../../../../utils/icons";
function BotonEditar(props) {
 
  return (
    <div >
      <button
        className="flex flex-row
        text-gray-600
        hover:bg-blue-100
        hover:text-blue-800
        rounded-tl-xl
         p-1 justify-end cursor-pointer text-sm transition-colors
         border-r-1" 
        onClick={props.onClick}
      >
        <span>Editar</span>
        <span className="w-5 h-4">{icons.editar}</span>
      </button>
    </div>
  );
}

export default BotonEditar;
