import ColumnaPrincipal from './cardComponents/ColumnaPrincipal';
import UsuarioActual from './cardComponents/UsuarioActual';
import BotonEditar from './cardComponents/BotonEditar';
import BotonPapelera from './cardComponents/BotonPapelera';
import BotonObservaciones from './cardComponents/BotonObservaciones';
import MarcoCard from './cardComponents/MarcoCard';
import TipoDeTramite from './cardComponents/TipoDeTramite';
import { format, addDays } from 'date-fns';
import pesosArg from '../../../utils/pesosArg';
import { useState } from 'react';
import { useDelReintegro } from '../../../hooks/useDeleteReintegro';
import ModalObservaciones from '../../ModalObservaciones/ModalObservaciones';
import { useCommentReintegro } from '../../../hooks/useCommentReintegro';
import { useNavigate } from 'react-router-dom';
import { useReintegroStore } from '../../../store/reintegroStore';
import Swal from 'sweetalert2';
import { useUserStore } from '../../../store/userStore';
import DetallesCard from '../../DetallesCard';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function ReintegroCard(props) {
  const dashboard = props.dashboard || false;
  const reintegro = props.reintegro;
  const { deleteReintegro } = useDelReintegro();
  const fechaDePrestacion = format(addDays(reintegro.fechaDePrestacion, 1), 'dd/MM/yyyy');
  const valorTotal = pesosArg.format(reintegro.factura.valorTotal);
  const ultimaObsPrestador = reintegro?.observaciones?.filter(obs => obs.rolEmisor === 'Prestador').slice(-1)[0];
  const navigate = useNavigate();

  const user = useUserStore(state => state.user);
  const rolSesion = user?.rolSesion;
  const showButtons = rolSesion === 'Titular' && (reintegro?.rolAfiliado === 'Cónyuge' || reintegro?.rolAfiliado === 'Hijo Mayor');
  const showUsuarioCard = (rolSesion === 'Titular' && user.grupoFamiliar?.length > 1) || rolSesion === 'Cónyuge';

  const fechaFormateada = reintegro?.fechaActualizacion
    ? new Date(reintegro.fechaActualizacion).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : 'Sin fecha';

  //Estilo de la card
  // const cardStyle = 'grid-cols-3';

  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);

  const { onSubmit: commentReintegro } = useCommentReintegro();
  const setReintegro = useReintegroStore(state => state.setReintegro);

  // Detalles
  const [detallesIsOpen, setDetallesIsOpen] = useState(false);

  const mostrarObservacionesRechazado = () => {
    Swal.fire({
      icon: 'error',
      iconColor: '#dc143c',
      titleText: 'Motivo de rechazo:',
      text: ultimaObsPrestador?.descripcion,
      confirmButtonText: 'Continuar',
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal-confirm-button'
      }
    });
  };

  return (
    <div className='relative'>
      <ModalObservaciones
        open={isObservacionesOpen}
        onClose={() => setIsObservacionesOpen(false)}
        nombreUsuario={reintegro.paraAfiliado}
        headerText='Volver a Reintegros'
        fechaEnvio={ultimaObsPrestador?.fecha}
        observacionesTexto={ultimaObsPrestador?.descripcion}
        idTramite={reintegro.id}
        onSubmit={commentReintegro}
      />
      <DetallesCard
        className={clsx('absolute z-10 shadow-custom-shadow transition-all duration-300', { 'rotate-x-180 -z-10 shadow-none': !detallesIsOpen })}
        reintegro={reintegro}
        isOpen={detallesIsOpen}
        setIsOpen={setDetallesIsOpen}
      />

      <MarcoCard
        estilo='grid-cols-3'
        className={twMerge(clsx('transition-all duration-300', { 'rotate-x-180 shadow-none': detallesIsOpen }))}
        estado={reintegro.estado}
        mostrarDetalle={true}
        setdetalleOn={() => setDetallesIsOpen(true)}
        fechaSolicitud={fechaFormateada}
      >
        <ColumnaPrincipal>
          {reintegro.especialidad}

          {`Dr. ${reintegro.medico}`}
          {`Fecha de la prestación: ${fechaDePrestacion}`}
          {valorTotal}
          {reintegro.lugarDeAtencion}
        </ColumnaPrincipal>
        {/**Columna dinámica con opciones o información del trámite */}
        <div className='grid grid-rows-4 justify-items-end relative'>
          {/*El estilo del estado es dinámico si está o no en el dashboard*/}
          {props.dashboard ? ( //Si es card de dashboard mostrar el tipo de tramite
            <>
              <>{showUsuarioCard && <UsuarioActual paciente={reintegro.paraAfiliado} />}</>
                <TipoDeTramite tipo={'Reintegro'} colorEstado={reintegro.estado}/>
            </>
          ) : (
            <>
              {showUsuarioCard && <UsuarioActual paciente={reintegro.paraAfiliado} />}
              {reintegro.estado !== 'pendiente' && reintegro.estado !== 'aceptado' && reintegro.estado !== 'en análisis' ? ( //el estado está en minuscula
                !showButtons && (
                  <div className='row-start-4'>
                    <BotonObservaciones
                      onClick={() => {
                        if (reintegro.estado === 'observado') {
                          setIsObservacionesOpen(true);
                        } else if (reintegro.estado === 'rechazado') {
                          mostrarObservacionesRechazado();
                        }
                      }}
                    />
                  </div>
                )
              ) : (
                <></>
              )}
            </>
          )}
          {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {reintegro.estado == 'pendiente' && dashboard == false ? ( //El estado está en minuscula
            !showButtons && (
              <div className='flex items-baseline-last justify-end row-start-4'>
                <BotonEditar
                  onClick={() => {
                    setReintegro(reintegro);
                    navigate('/reintegros/editar-reintegro');
                  }}
                />
                <BotonPapelera onClick={() => deleteReintegro(reintegro, fechaDePrestacion, valorTotal)} />
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </MarcoCard>
    </div>
  );
}

export default ReintegroCard;
