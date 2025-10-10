import { icons } from "../../../../utils/icons";
function BotonDescargar(props) {
  
 
  return (
    <div >
      <button
        className="flex flex-row
        text-gray-600
        hover:bg-green-100
        hover:text-green-800
         p-1 justify-end cursor-pointer text-sm transition-colors
         rounded-full
         px-3
         bg-green-50  border-s-gray-900 shadow-2xs
         " 
        onClick={props.onClick}
      >
        <span></span>
        <span className="w-5 h-4">{icons.descargas}</span>
      </button>
    </div>
  );
}

export default BotonDescargar;