import ColumnaPrincipal from './cardComponents/ColumnaPrincipal';
import UsuarioActual from './cardComponents/UsuarioActual';
import BotonEditar from './cardComponents/BotonEditar';
import BotonPapelera from './cardComponents/BotonPapelera';
import BotonObservaciones from './cardComponents/BotonObservaciones';
import EstadoCard from './cardComponents/EstadoCard';
import MarcoCard from './cardComponents/MarcoCard';
import TipoDeTramite from './cardComponents/TipoDeTramite';
import { format } from 'date-fns';
import { useDeleteReintegro } from '../../../services/queries';
import Swal from 'sweetalert2';

import { useState } from "react";
function ReintegroCard(props) {
  //Estilo de la card
  const { mutateAsync } = useDeleteReintegro();

  let cardStyle = ` grid-cols-2 `;

  let reintegro = props.reintegro;

  const deleteReintegro = async () => {
    try {
      Swal.fire({
        html: '¿Desea cancelar el reintegro?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc143c',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#00ab01'
      }).then(async result => {
        try {
          if (result.isConfirmed) {
            const res = await mutateAsync(reintegro.id);
            Swal.fire({
              html: res.message,
              icon: 'success',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#00ab01'
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MarcoCard estilo={cardStyle} estado = {reintegro.estado}>
      <ColumnaPrincipal >
        {reintegro.especialidad}
        {''/**Provisorio */}
        {`Dr. ${reintegro.medico}`}
        {`Fecha de la prestación ${format(reintegro.fecha, 'dd/MM/yyyy')}`}
        {reintegro.valor}
        {reintegro.lugar}
      </ColumnaPrincipal>
      {/**Columna dinámica con opciones o información del trámite */}
      <div className='grid grid-rows-4 justify-items-end relative'>
        
        
        
        {/*El estilo del estado es dinámico si está o no en el dashboard*/}
        {props.dashboard ? ( //Si es card de dashboard mostrar el tipo de tramite
          <TipoDeTramite tipo={'Reintegro'} />
        ) : (
          <>
            <UsuarioActual paciente={reintegro.paraAfiliado} />
            {reintegro.estado == 'Pendiente' ? (
              <>
                <BotonEditar posicion={3} />
                <BotonPapelera
                  posicion={4}
                  onClick={deleteReintegro}
                  />
              </>
            ) : (
              <BotonObservaciones />
            )}
          </>
        )}
        </div>
      
    </MarcoCard>
  );
}

export default ReintegroCard;
