import Form from '../Form.jsx';
import Input from '../Input.jsx';
import Button from '../Button.jsx';
import { useEffect, useState } from 'react';
import { validarRegistroCBU } from '../../utils/validarRegistroCBU.js';
import { useRegistrarCbu } from '../../services/miCuentaQueries.js';
import Swal from 'sweetalert2';

function ModalRegistrarCBU({ isOpen, setIsOpen }) {
  const [registro, setRegistro] = useState({
    nroCBU: '',
    tipoDeCuenta: '',
    cuilOCuit: '',
    nombre: '',
    apellido: ''
  });
  const [errores, setErrores] = useState({});
  const { mutateAsync } = useRegistrarCbu();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!isOpen) return null;

  const handleConfirmar = async e => {
    e.preventDefault();
    const erroresValidados = validarRegistroCBU(registro); //agregue las validaciones
    setErrores(erroresValidados);

    if (Object.keys(erroresValidados).length === 0) {
      try {
        const datosTransformados = {
          nombre: registro.nombre,
          apellido: registro.apellido,
          cbu: registro.nroCBU,
          tipoDeCuenta: registro.tipoDeCuenta,
          cuil: registro.cuilOCuit
        };
        await mutateAsync(datosTransformados);
        // onRegistrarCBU(`${registro.nombre} ${registro.apellido}`, registro.nroCBU);
        setIsOpen(false);
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El CBU fue registrado exitosamente.',
          icon: 'success',
          iconColor: '#00ab01',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#00ab01',
          width: '400px',
          customClass: {
            popup: 'swal-popup-small',
            title: 'swal-title-small',
            confirmButton: 'swal-button-small'
          }
        });
      } catch (error) {
        console.error('Error al registrar CBU:', error);
        const message = error?.response?.status === 409 ? error?.response?.data?.message : 'Ha ocurrido un error inesperado. Vuelva a intentarlo más tarde.';
        Swal.fire({
          title: 'Error al registrar CBU',
          text: message,
          icon: 'warning',
          iconColor: '#dc143c',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#00ab01'
        });
      }
    }
  };
  const handleChange = e => {
    const { id } = e.target;
    let valor = e.target.value.replace(/-/g, ''); // quitar guiones para validar

    // Formateo para nroCBU
    if (id === 'nroCBU') {
      if (!/^\d*$/.test(valor)) return;
      if (valor.length > 22) return;

      if (valor.length > 8) {
        valor = `${valor.slice(0, 8)}-${valor.slice(8)}`;
      }
    }

    // agrega guiones
    if (id === 'cuilOCuit') {
      if (!/^\d*$/.test(valor)) return;
      if (valor.length > 11) return;

      if (valor.length === 11) {
        valor = `${valor.slice(0, 2)}-${valor.slice(2, 10)}-${valor.slice(10)}`;
      } else if (valor.length > 2) {
        valor = `${valor.slice(0, 2)}-${valor.slice(2)}`;
      }
    }

    setRegistro({ ...registro, [id]: valor });
  };

  return (
    <div className='inset-0 h-full fixed top-0 left-0 z-50 bg-negro-translucido flex items-center justify-center'>
      <Form
        onSubmit={handleConfirmar}
        legend={'REGISTRO DE CBU'}
        className='w-3xl'
      >
        <p className='text-sm font-medium text-negro-principal pb-4 mt-[-8px]'>Los pagos de reintegro se realizan por CBU. Corrobore que sea correcto.</p>
        <div className='flex flex-col w-full pb-4'>
          <Input
            id='nroCBU'
            label='N° de CBU'
            placeholder='Ingresar CBU'
            onChange={handleChange}
            maxLength={23}
            value={registro.nroCBU}
            inputMode='numeric'
          />

          {errores.nroCBU && <p className='text-red-500 text-sm mt-1'>{errores.nroCBU}</p>}
        </div>
        <div className='flex flex-row gap-4 w-full pb-4'>
          <div className='flex flex-col w-1/2 mr-2 gap-3'>
            <div className='flex self-stretch flex-col justify-end items-start gap-2'>
              <label
                htmlFor='tipoDeCuenta'
                className='text-base font-bold w-fit select-none'
              >
                Tipo de cuenta
              </label>
              <select
                className='outline-none border border-slate-300 rounded-lg h-fit p-3 min-w-40 w-full'
                name='tipoDeCuenta'
                id='tipoDeCuenta'
                onChange={handleChange}
              >
                <option className='py-2 pl-3'>Seleccionar tipo de cuenta</option>
                <option
                  className='py-2 pl-3'
                  value='Cuenta corriente'
                >
                  Cuenta corriente
                </option>
                <option
                  className='py-2 pl-3'
                  value='Caja de ahorro'
                >
                  Caja de ahorro
                </option>
                <option
                  className='py-2 pl-3'
                  value='Cuenta sueldo'
                >
                  Cuenta sueldo
                </option>
              </select>
              {errores.tipoDeCuenta && <p className='text-red-500 text-sm mt-1'>{errores.tipoDeCuenta}</p>}
            </div>
            <Input
              id='nombre'
              label='Nombre'
              placeholder='Ingresar nombre'
              onChange={handleChange}
              maxLength={20}
              value={registro.nombre}
              inputMode='text'
            />
            {errores.nombre && <p className='text-red-500 text-sm mt-1'>{errores.nombre}</p>}
          </div>
          <div className='flex flex-col w-1/2 ml-2 gap-3'>
            <Input
              id='cuilOCuit'
              label='CUIL o CUIT'
              placeholder='Ingresar CUIL o CUIT'
              onChange={handleChange}
              maxLength={13}
              value={registro.cuilOCuit}
              inputMode='numeric'
            />

            {errores.cuilOCuit && <p className='text-red-500 text-sm mt-1'>{errores.cuilOCuit}</p>}
            {errores.cuilOCuitFormato && <p className='text-red-500 text-sm mt-1'>{errores.cuilOCuitFormato}</p>}
            <Input
              id='apellido'
              label='Apellido'
              placeholder='Ingresar apellido'
              onChange={handleChange}
              maxLength={20}
              value={registro.apellido}
              inputMode='text'
            />
            {errores.apellido && <p className='text-red-500 text-sm mt-1'>{errores.apellido}</p>}
          </div>
        </div>
        <div className='flex gap-4 w-full justify-end'>
          <Button
            state='active'
            style='outln'
            type='button'
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            state='active'
            style='fill'
            type='submit'
          >
            Confirmar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ModalRegistrarCBU;
