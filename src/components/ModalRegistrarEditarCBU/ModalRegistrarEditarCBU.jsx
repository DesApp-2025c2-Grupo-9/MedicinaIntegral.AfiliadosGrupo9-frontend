import Form from '../Form.jsx';
import Input from '../Input.jsx';
import Button from '../Button.jsx';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import soloLetrasYEspaciosConLimite from '../../utils/validacion.caracteresYLimite.js';
import { useEditarCbu, useEliminarCbu, useRegistrarCbu } from '../../services/miCuentaQueries.js';
import { validarRegistroCBU } from '../../utils/validarRegistroCBU.js';
import Select from '../Select.jsx';
import InputContainer from '../InputContainer.jsx';
import TwoButtons from '../TwoButtons.jsx';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

function ModalRegistrarEditarCBU({ setIsOpen, cbuActual }) {
  const [registro, setRegistro] = useState(cbuActual || {});
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const { mutateAsync: createCbu } = useRegistrarCbu();
  const { mutateAsync: editCbu } = useEditarCbu();
  const { mutateAsync: deleteCbu } = useEliminarCbu();
  const tipoDeCuentaArr = ['Cuenta corriente', 'Caja de ahorro', 'Cuenta sueldo'];

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
    setRegistro({ ...registro, tipoDeCuenta: cbuActual?.tipoDeCuenta || tipoDeCuentaArr[0] });
  }, []);

  const transformData = data => ({
    cbu: data?.nroCBU,
    nombre: data?.nombre,
    apellido: data?.apellido,
    cuil: data?.cuilOCuit,
    tipoDeCuenta: data?.tipoDeCuenta
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const erroresValidados = validarRegistroCBU(registro);
    setErrores(erroresValidados);
    const successTitle = cbuActual ? 'CBU actualizado' : 'Registro exitoso';
    const successText = cbuActual ? 'Los datos fueron modificados exitosamente.' : 'El CBU fue registrado exitosamente.';
    const errorTitle = cbuActual ? 'Error al editar el CBU' : 'Error al registrar el CBU';

    if (Object.keys(erroresValidados).length === 0) {
      try {
        const datosTransformados = transformData(registro);
        if (cbuActual) {
          await editCbu(datosTransformados);
        } else {
          await createCbu(datosTransformados);
        }
        setIsOpen(false);
        await Swal.fire({
          icon: 'success',
          iconColor: '#00ab01',
          title: successTitle,
          html: successText,
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button'
          }
        });
        if (cbuActual) navigate(0);
      } catch (error) {
        const message = error?.response?.data?.message || 'Ha ocurrido un error inesperado. Vuelva a intentarlo más tarde.';
        Swal.fire({
          icon: 'error',
          iconColor: '#dc143c',
          title: errorTitle,
          html: message,
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button'
          }
        });
      }
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      icon: 'warning',
      iconColor: '#dc143c',
      titleText: 'Está a punto de eliminar el CBU.',
      html: '¿Desea continuar?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html',
        cancelButton: 'swal-cancel-button',
        confirmButton: 'swal-confirm-button'
      }
    }).then(async result => {
      try {
        if (result.isConfirmed) {
          const res = await deleteCbu(registro?.nroCBU);
          setIsOpen(false);
          await Swal.fire({
            icon: 'success',
            iconColor: '#00ab01',
            titleText: 'CBU eliminado',
            html: res.message || 'CBU eliminado exitosamente.',
            confirmButtonText: 'Continuar',
            customClass: {
              title: 'swal-title',
              htmlContainer: 'swal-html',
              confirmButton: 'swal-confirm-button'
            }
          });
          navigate(0);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.close();
        }
      } catch (error) {
        const message = error?.response?.data?.message || 'Ha ocurrido un error inesperado. Vuelva a intentarlo más tarde.';
        Swal.fire({
          icon: 'error',
          iconColor: '#dc143c',
          title: 'Error al eliminar el CBU',
          html: message,
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button'
          }
        });
      }
    });
  };

  const formDescription = cbuActual
    ? 'Puede modificar los datos del CBU o eliminarlo.'
    : 'Los pagos de reintegros por transferencia requieren de un CBU. Corrobore que los datos sean correctos.';

  const handleChangeCBU = e => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todo caracter que no sea un número
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8, 22);
    }
    value = value.slice(0, 23);
    setRegistro({ ...registro, nroCBU: value });
  };

  const handleChangeCUIL = e => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todo caracter que no sea un número
    value = value.slice(0, 11);
    let formatted = value;
    if (value.length > 2 && value.length <= 10) {
      formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 10) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 10)}-${value.slice(10)}`;
    }
    setRegistro({ ...registro, cuilOCuit: formatted });
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setRegistro({ ...registro, [id]: value });
  };

  return (
    <div className='inset-0 h-full fixed top-0 left-0 z-50 bg-negro-translucido flex items-center justify-center'>
      <Form
        onSubmit={handleSubmit}
        legend={cbuActual ? 'Edite o elimine el CBU' : 'Registrar CBU'}
        className='w-[calc(100%-32px)] max-w-3xl animate-modal'
        legendClassName='text-xl font-bold text-blue-500'
      >
        <span className={clsx('text-sm', { 'hidden md:flex': cbuActual })}>{formDescription}</span>

        <Input
          id='nroCBU'
          label='N° de CBU:'
          placeholder='Ingresar CBU'
          onChange={handleChangeCBU}
          value={registro?.nroCBU}
          maxLength={23}
          inputMode='numeric'
          errorMsg={errores.nroCBU}
          disabled={cbuActual}
        />

        <InputContainer className='flex-row'>
          <Select
            label='Tipo de cuenta:'
            name='tipoDeCuenta'
            id='tipoDeCuenta'
            options={tipoDeCuentaArr}
            defaultValue={registro?.tipoDeCuenta}
            onChange={handleChange}
            errorMsg={errores.tipoDeCuenta}
          />
          <Input
            id='cuilOCuit'
            label='CUIL o CUIT:'
            placeholder='Ingresar CUIL o CUIT'
            onChange={handleChangeCUIL}
            value={registro?.cuilOCuit}
            inputMode='numeric'
            errorMsg={errores.cuilOCuit}
          />
        </InputContainer>

        <InputContainer className='flex-row'>
          <Input
            id='nombre'
            label='Nombre:'
            placeholder='Ingresar nombre'
            onChange={handleChange}
            onKeyDown={soloLetrasYEspaciosConLimite(50)}
            value={registro?.nombre}
            inputMode='text'
            errorMsg={errores.nombre}
          />
          <Input
            id='apellido'
            label='Apellido:'
            placeholder='Ingresar apellido'
            onChange={handleChange}
            onKeyDown={soloLetrasYEspaciosConLimite(50)}
            value={registro?.apellido}
            inputMode='text'
            errorMsg={errores.apellido}
          />
        </InputContainer>

        <TwoButtons>
          {cbuActual && (
            <Button
              style='outln'
              className='border-rojo-alerta text-rojo-alerta hover:border-red-300 hover:text-red-300'
              type='button'
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          )}
          <Button
            style='outln'
            onClick={() => setIsOpen(false)}
            className='ml-auto'
            type='button'
          >
            Cancelar
          </Button>
          <Button type='submit'>Guardar cambios</Button>
        </TwoButtons>
      </Form>
    </div>
  );
}

export default ModalRegistrarEditarCBU;
