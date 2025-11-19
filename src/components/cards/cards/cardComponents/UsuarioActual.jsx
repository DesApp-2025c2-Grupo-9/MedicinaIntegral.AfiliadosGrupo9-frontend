import { icons } from "../../../../utils/icons";

function UsuarioActual({ paciente='Jane Doe' }) {
  /*
    El usuario logueado actualmente, propietario de turnos y trámites.
    */
  return (
    // <div className="col-start-2 row-start-1 flex text-sm text-gray-600 justify-end">
    <div className="flex text-sm text-gray-600 w-fit">
      <span className="w-4 h-4 mr-1">{icons.usuario}</span>
      <span className='text-nowrap'>{paciente}</span>
    </div>
  );
}

export default UsuarioActual;
