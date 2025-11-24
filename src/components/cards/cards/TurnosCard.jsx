import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import { useAnularReserva, useReservarTurno } from "../../../services/turnosQueries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetAfiliado } from "../../../services/queries";
import { useUserStore } from "../../../store/userStore";
function TurnosCard(props) {
  const navigate = useNavigate();
  //Recibe en sus props un turno
  //Opcionalmente, si el turno le pertenece al afiliado, se manda el afiliado o una flag
  //  que indique que el turno pertenece al paciente
  const {
    mutateAsync: reservar,
    isLoading: isReservando,
    isSuccess: isReservado,
    isError: isErrorReserva
    
  } = useReservarTurno();

  //Usuario actual para mostrar la papelera si corresponde
  const user = useUserStore(state => state.user)
  const {data: afiliadoRes } = useGetAfiliado();
  const afiliado = afiliadoRes?.data;
  const grupoFamiliar = afiliado?.grupoFamiliar;
  const afiliadoActual = grupoFamiliar?.find(familiar => familiar?.id === user?.idAfiliado)
  const rolAfiliadoActual = afiliadoActual.rol;

  
  
  
  const { mutateAsync: anularReserva} = useAnularReserva();
  const turno = props.turno; //El turno con el que se va a cargar la primera columna
  const paciente = props.paciente; //Flag  paciente
  const idAfiliadoParaEliminar = props.idAfiliadoTurno
  const isPast = props.isPast;
  const fechaTurnoStr = turno.fechaTurno;
  const fechaTurno = new Date(fechaTurnoStr)
  const ahora = new Date();
  const diferenciaMs = fechaTurno.getTime() - ahora.getTime();
  const ms24Hs = 86400000;
  let cardStyle = `relative overflow-hidden group transition-all duration-300  ${paciente ? 'grid-cols-2' : ''}`;
  
  //Para saber si el turno corresponde al usuario logueado
  
  const turnoPropio = user.idAfiliado === props.idAfiliadoTurno
  
  //Para saber si el turno corresponde a un hijo menor
  const turnoDeHijoMenor = rolAfiliadoActual === 'Hijo Menor'
  
const mostrarPapelera = () => {
  return diferenciaMs > ms24Hs && (turnoPropio || turnoDeHijoMenor);
};



  const deleteTurno = async () => {
    //Lógica a aplicar al apretar la papelera
    const fechaFormateada = formatFecha(turno.fechaTurno)
    const result = await Swal.fire({
      title: "Está a punto de cancelar el turno:",
      html: `<p>Para la especialidad: <b>${turno.especialidad}</b><br />
      Con: <b>${turno.prestador}</b><br />
      El día: <b>${fechaFormateada}</b></p>`,
      // text: `Para la especialidad ${turno.especialidad} con ${turno.prestador} el día ${fechaFormateada}`,
      icon: "warning",
      iconColor: '#dc143c',
      showCancelButton: true,
      cancelButtonColor: '#dc143c',
      confirmButtonColor: '#00ab01',
      confirmButtonText: 'Cancelar Turno',
      cancelButtonText: 'Volver',
      customClass: {
        htmlContainer: 'turnos-html',
        title: 'turnos-title',
        cancelButton: 'turnos-cancel-button',
        confirmButton: 'turnos-confirm-button'
      }
    })
    if (!result.isConfirmed) {
      return;
    }
    try {
      // Mostramos un modal de "Cargando..."
      Swal.fire({
        title: 'Cancelando...',
        text: 'Por favor esperá.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // 6. LLAMAMOS A LA MUTACIÓN Y ESPERAMOS (await)
      await anularReserva({
        idTurno: turno.idTurno,
        idAfiliado: idAfiliadoParaEliminar
      });

      // 7. SI 'await' TERMINA BIEN (Éxito):
      // Tu 'onSuccess' global (el de 'invalidateQueries') se va a disparar solo.
      // Y acá mostramos el modal de éxito.
      Swal.fire({
        title: "Reserva anulada",
        text: "Tu turno ha sido cancelando exitosamente.",
        icon: "success",
        iconColor: '#00ab01',
        confirmButtonColor: '#00ab01',
        customClass: {
          htmlContainer: 'turnos-html',
          title: 'turnos-title',
          confirmButton: 'turnos-confirm-button'
        }
      });

    } catch (error) {
      // 8. SI 'await' FALLA (Error):
      console.log('Error en la anulacińo: ', error)
      Swal.fire({
        title: "Error",
        text: "No se pudo anular la reserva del turno.",
        icon: "error"
      });
    }
  };
  const reservarTurno = async () => {
    const fechaFormateada = formatFecha(turno.fechaTurno)
    const result = await Swal.fire({
      title: "Está a punto de reservar el turno:",
      html: `<p>Para la especialidad: <b>${turno.especialidad}</b><br />
      Con: <b>${turno.prestador}</b><br />
      El día: <b>${fechaFormateada}</b></p>`,
      icon: "question",
      iconColor: '#00ab01',
      showCancelButton: true,
      confirmButtonColor: "#00ab01",
      cancelButtonColor: "#dc143c",
      confirmButtonText: "Reservar",
      cancelButtonText: 'Cancelar',
      customClass: {
        htmlContainer: 'turnos-html',
        title: 'turnos-title',
        cancelButton: 'turnos-cancel-button',
        confirmButton: 'turnos-confirm-button'
      }
    })
    if (!result.isConfirmed) {
      return;
    }
    try {
      // Mostramos un modal de "Cargando..."
      Swal.fire({
        title: 'Reservando...',
        text: 'Por favor esperá.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // 6. LLAMAMOS A LA MUTACIÓN Y ESPERAMOS (await)
      await reservar({
        idTurno: turno.idTurno,
        idAfiliado: props.idAfiliadoParaReservar
      });
      
      // 7. SI 'await' TERMINA BIEN (Éxito):
      // Tu 'onSuccess' global (el de 'invalidateQueries') se va a disparar solo.
      // Y acá mostramos el modal de éxito.
      Swal.fire({
        title: "¡Reservado!",
        text: "Tu turno ha sido reservado exitosamente.",
        icon: "success",
        iconColor: '#00ab01',
        confirmButtonColor: '#00ab01',
        customClass: {
          htmlContainer: 'turnos-html',
          title: 'turnos-title',
          confirmButton: 'turnos-confirm-button'
        }
        //Cuando se aplica el boton de confirmación se navega hacia ('/turnos/turnos-reservados')
      });
      navigate('/turnos/turnos-reservados')

    } catch (error) {
      // 8. SI 'await' FALLA (Error):
      // La API tiró un error (ej: el turno ya no estaba disponible)
      console.log('Error en la reserva: ', error)
      Swal.fire({
        title: "Error",
        text: "No se pudo reservar el turno. Es posible que ya haya sido tomado.",
        icon: "error"
      });
    }
  }
  

  return (
    <MarcoCard estilo={cardStyle} >
      <div className={`transition-all duration-300 group-hover:blur-xxs group-hover:brightness-75 ${paciente || 'grid-cols-2'} ${isPast ? 'opacity-60 grayscale-[50%]': ''}`}>
        <div>

          {/*columna datos del turno*/}
          <ColumnaPrincipal >
            {paciente && turno.especialidad}
            {turno.prestador}
            {formatFecha(turno.fechaTurno)}
            {turno.lugarAtencion}
            {turno.direccion}
            {turno.telefono}
          </ColumnaPrincipal>
        </div>
      </div>
      {/*Columna derecha si tiene turno asignado*/}
      {paciente && (
        <div className="grid grid-rows-4 justify-end">
          <UsuarioActual paciente={props.nombrePaciente}/>
          <div className="row-start-4 justify-self-end">

            {!isPast? (//Si no pasó
              //Si faltan más de 24hs hasta el turno mostrar el botón de papelera
              mostrarPapelera() &&
              <BotonPapelera
                onClick={deleteTurno}
              />
            ): (
              <span className="text-sm font-bold text-gray-500 p-2">
                Finalizado
              </span>
            )}
          </div>
        </div>
      )}
      {!paciente &&
        <button
          /* className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-green-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" */
          className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-negro-translucido opacity-0 uppercase group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-xs"
          onClick={reservarTurno}
        >
          Reservar turno
        </button>
      }

    </MarcoCard>
  );
}

export default TurnosCard;

function formatFecha(fechaParam) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario
  const fecha = new Date(fechaParam)
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  const horas = (fecha.getHours() < 10 ? `0${fecha.getHours()}` : fecha.getHours())
  const minutos = (fecha.getMinutes() < 10 ? `0${fecha.getMinutes()}` : fecha.getMinutes())

  return `${dia}/${mes}/${anio} - ${horas}:${minutos}hs`;
}
