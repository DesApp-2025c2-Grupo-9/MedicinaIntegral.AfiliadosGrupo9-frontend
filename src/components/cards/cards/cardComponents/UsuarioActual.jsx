import { icons } from "../../../../utils/icons";

function UsuarioActual() {
  /*
    El usuario logueado actualmente, propietario de turnos y trámites.
    */
  let paciente = "Jane Doe";
  return (
    <div className="col-start-2 row-start-1 flex text-sm text-gray-600 justify-end">
      <span className="w-4 h-4 mr-1">{icons.usuario}</span>
      <span>Para {paciente}</span>
    </div>
  );
}

export default UsuarioActual;
