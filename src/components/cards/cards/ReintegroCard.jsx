import ColumnaPrincipal from './cardComponents/ColumnaPrincipal';
import UsuarioActual from './cardComponents/UsuarioActual';
import BotonEditar from './cardComponents/BotonEditar';
import BotonPapelera from './cardComponents/BotonPapelera';
import BotonObservaciones from './cardComponents/BotonObservaciones';
import MarcoCard from './cardComponents/MarcoCard';
import TipoDeTramite from './cardComponents/TipoDeTramite';
import { format } from 'date-fns';
import { useDeleteReintegro } from '../../../services/queries';
import Swal from 'sweetalert2';
import capitalize from '../../../utils/capitalize';//El capitalize no se está usando porque el esatdo viene en minuscula igual que el comparador
import pesosArg from '../../../utils/pesosArg';

function ReintegroCard(props) {
  //Estilo de la card
  const { mutateAsync } = useDeleteReintegro();
  const cardStyle = ` grid-cols-2 `;
  const reintegro = props.reintegro;
  const fechaDePrestacion = format(reintegro.fechaDePrestacion, 'dd/MM/yyyy');
  const valorTotal = pesosArg.format(reintegro.factura.valorTotal);

  const editarReintegro = () => {
    //Editar reintegro
    alert('Boton editar reintegro')
  }

  const deleteReintegro = async () => {
    try {
      Swal.fire({
        html: `<p>Está a punto de cancelar la solicitud de reintegro:</p>
          <br />
          <p>Para afiliado: <b>${reintegro.paraAfiliado}</b></p>
          <p>Fecha de prestación: <b>${fechaDePrestacion}</b></p>
          <p>Especialidad: <b>${reintegro.especialidad}</b></p>
          <p>Lugar de atención: <b>${reintegro.lugarDeAtencion}</b></p>
          <p>Valor total: <b>${valorTotal}</b></p>
          <br />
          <p>¿Desea continuar?</p>
        `,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc143c',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#00ab01',
        customClass: {
          cancelButton: 'reintegros-cancel-button',
          confirmButton: 'reintegros-confirm-button'
        }
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
  console.log(reintegro.estado)
  return (
    <MarcoCard
      estilo={cardStyle}
      estado={reintegro.estado}
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
          <TipoDeTramite tipo={'Reintegro'} />
        ) : (
          <>
            <UsuarioActual paciente={reintegro.paraAfiliado} />
            {reintegro.estado !== 'pendiente' ? (//el estado está en minuscula
              <div className='row-start-4'>

                <BotonObservaciones />
              </div>
              
            ) : <></>}
          </>
        )}
        {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {reintegro.estado == 'pendiente' && props.dashboard == false? (//El estado está en minuscula
            <div className="flex items-baseline-last justify-end row-start-4">
              <BotonEditar onClick = {editarReintegro}/>
              <BotonPapelera onClick = {deleteReintegro}/>
            </div>
          ): <></> 
          }
        </div>
    </MarcoCard>
  );
}

export default ReintegroCard;
