import { FaPhone } from "react-icons/fa";

function CampoInformacion({ children }) {
  //Children es el texto que va a contener
  return <div className="flex items-center gap-2 text-black text-xs">
    {
      validarTelefono(children) &&
      <FaPhone size={12}/>
    }
    <span>
    {children}
    </span>
    </div>;
}
function validarTelefono(str) {
  //Verifica si se recibió un telefono por parámetro
  return /^\d{10}$/.test(str);
}

export default CampoInformacion;
