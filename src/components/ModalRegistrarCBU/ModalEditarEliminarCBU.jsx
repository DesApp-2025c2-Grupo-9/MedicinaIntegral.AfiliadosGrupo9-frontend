import Form from '../Form.jsx';
import Input from '../Input.jsx';
import Button from '../Button.jsx';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import soloLetrasYEspaciosConLimite from '../../utils/validacion.caracteresYLimite.js';
import { useEditarCbu, useEliminarCbu, useGetMiCuenta } from '../../services/miCuentaQueries.js';
import { validarRegistroCBU } from '../../utils/validarRegistroCBU.js';

function ModalEditarEliminarCBU({ isOpen, setIsOpen, cbuActual }) {
  const [registro, setRegistro] = useState(cbuActual || {});
  const [errores, setErrores] = useState({});
  const { mutateAsync: editarCbu } = useEditarCbu();
  const { mutateAsync: eliminarCbu } = useEliminarCbu();

  if (!isOpen) return null;
 

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  useEffect(() => {
  if (cbuActual) {
    setRegistro({
      nroCBU: cbuActual.cbu,             
      tipoDeCuenta: cbuActual.tipoDeCuenta,
      cuilOCuit: cbuActual.cuil,         
      nombre: cbuActual.nombre,
      apellido: cbuActual.apellido,
      _id: cbuActual._id    
    });
  }
}, [cbuActual]);



  const handleEliminar = async () => {
    
    const resultado = await Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción eliminará el CBU de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc143c',
      cancelButtonColor: '#00ab01'
    });

    if (resultado.isConfirmed) {
      try {
        await eliminarCbu(registro._id);
        setIsOpen(false);
        Swal.fire({
          title: 'CBU eliminado',
          text: 'El CBU fue eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#00ab01'
        });
      } catch (error) {
        Swal.fire({
          title: 'Error al eliminar CBU',
          text: 'No se pudo eliminar. Intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#dc143c'
        });
      }
    }
  };


  const handleEditar = async e => {
  e.preventDefault();
  const erroresValidados = validarRegistroCBU(registro);
  setErrores(erroresValidados);

  if (Object.keys(erroresValidados).length === 0) {
    try {
      
      const datosTransformados = {
        cbuPrincipal: registro.nroCBU ? registro.nroCBU.replace(/-/g, '') : '',
        tipoDeCuenta: registro.tipoDeCuenta,
        cuil: registro.cuilOCuit.replace(/-/g, ''),
        nombre: registro.nombre,
        apellido: registro.apellido
      };

      console.log("Datos enviados a editarCbu:", datosTransformados);
      


      const respuesta = await editarCbu(datosTransformados);   // actualiza en back
      console.log("Respuesta del backend:", respuesta);
      setRegistro(prev => {
        const nuevo = { ...prev, ...datosTransformados };
        console.log("Estado actualizado en el modal:", nuevo);
        return nuevo;
      });
            

      setIsOpen(false);
      Swal.fire({
        title: 'CBU actualizado',
        text: 'Los datos fueron modificados correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#00ab01'
      });
    } catch (error) {
      const mensaje = error?.response?.data?.message || 'No se pudo actualizar. Intente nuevamente.';
      console.error("Error al editar CBU:", error.response?.data || error.message);
      Swal.fire({
        title: 'Error al editar CBU',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc143c'
      });
    }
  }
};



  const handleChange = e => {
  const { id, value } = e.target;
  let valor = value;

  if (id === 'nroCBU') {
    valor = valor.replace(/-/g, '');
    if (!/^\d*$/.test(valor)) return;
    if (valor.length > 22) return;

    if (valor.length > 8) {
      valor = `${valor.slice(0, 8)}-${valor.slice(8)}`;
    }
  }

  if (id === 'cuilOCuit') {
    valor = valor.replace(/-/g, '');
    if (!/^\d*$/.test(valor)) return;
    if (valor.length > 11) return;

    if (valor.length === 11) {
      valor = `${valor.slice(0, 2)}-${valor.slice(2, 10)}-${valor.slice(10)}`;
    } else if (valor.length > 2) {
      valor = `${valor.slice(0, 2)}-${valor.slice(2)}`;
    }
  }

  
  if (id === 'tipoDeCuenta') {
    valor = value;
  }

  setRegistro({ ...registro, [id]: valor });
};


  return (
    <div className='inset-0 h-full fixed top-0 left-0 z-50 bg-negro-translucido flex items-center justify-center'>
      <Form onSubmit={handleEditar} legend='EDITAR / ELIMINAR CBU' className='w-3xl'>
        <p className='text-sm font-medium text-negro-principal pb-4 mt-[-8px]'>
          Puede modificar los datos del CBU o eliminarlo si ya no lo utiliza.
        </p>

      <div className='flex flex-col w-full pb-4'>
        <Input
          id='nroCBU'
          label='N° de CBU'
          placeholder='Ingresar CBU'
          onChange={handleChange}
          value={registro.nroCBU}
          maxLength={23}
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
                value={registro.tipoDeCuenta}
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
              onKeyDown= {soloLetrasYEspaciosConLimite(50)}
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
              onKeyDown= {soloLetrasYEspaciosConLimite(50)}
              value={registro.apellido}
              inputMode='text'
            />
            {errores.apellido && <p className='text-red-500 text-sm mt-1'>{errores.apellido}</p>}
          </div>
        </div>

        <div className='flex gap-4 w-full justify-end mt-4'>
          <Button state='active' style='outln' type='button' onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button state='active' style='fill' type='submit'>
            Guardar cambios
          </Button>
          <Button state='active' style='fill' type='button' onClick={handleEliminar}>
            Eliminar CBU
          </Button>
        </div>
      </Form>
      </div>
    
  );
}

export default ModalEditarEliminarCBU;