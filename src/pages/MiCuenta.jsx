import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { AfiliadoCard } from '../components/cards';
import Select from 'react-select';
import { useState } from 'react';
import { useGetMiCuenta, useSetCbuPrincipal } from '../services/miCuentaQueries';
import MiCuentaSkeleton from '../components/Skeletons/MiCuentaSkeleton';
import ModalRegistrarEditarCBU from '../components/ModalRegistrarEditarCBU/ModalRegistrarEditarCBU';
import { Info } from 'lucide-react';
import { toast } from 'react-toastify';

function MiCuenta() {
  const [CBUModalOnOff, setCBUModalOnOff] = useState(false);
  const [editarModalOnOff, setEditarModalOnOff] = useState(false);
  const { data, isLoading } = useGetMiCuenta();
  const { mutateAsync } = useSetCbuPrincipal();

  if (isLoading) return <MiCuentaSkeleton />;

  const afiliado = data?.data;
  const defaultCbu = afiliado?.cbus.find(entry => entry.cbu === afiliado?.cbuPrincipal);
  const cbuOptions = afiliado?.cbus.map(entry => ({
    value: entry.cbu,
    label: `${entry.cbu} ${entry.nombre} ${entry.apellido} (${entry.tipoDeCuenta})`
  }));
  const defaultOption = cbuOptions.find(option => option.value === afiliado?.cbuPrincipal);

  const toastContent = (
    <p className='text-sm text-negro-principal w-full text-center'>
      El <span className='font-bold text-menta-600'>CBU</span> por default se estableció correctamente.
    </p>
  );
  const handleChange = async selectedOption => {
    try {
      await mutateAsync({ nroCbu: selectedOption.value });
      toast.dismiss();
      toast(toastContent, {
        position: 'top-center',
        hideProgressBar: true,
        closeButton: false,
        autoClose: 3000,
        containerId: 'toasty',
        className: 'border border-menta-600 shadow-custom-shadow',
        style: { backgroundColor: '#e2ffe2', width: '360px', borderRadius: '8px' }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-5 mb-5'>
      <div className='flex flex-col gap-2'>
        <SectionTitle>Mi cuenta</SectionTitle>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>{afiliado ? <AfiliadoCard afiliado={afiliado} /> : <p>No se encontraron datos del afiliado.</p>}</div>
      </div>

      {afiliado.grupoFamiliar.length > 1 && (
        <div className='flex flex-col gap-2'>
          <SectionTitle>Grupo familiar</SectionTitle>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
            {afiliado?.grupoFamiliar?.map(familiar => {
              if (familiar.nombre !== afiliado.nombre) {
                return (
                  <AfiliadoCard
                    key={familiar.id}
                    afiliado={familiar}
                  />
                );
              }
            })}
          </div>
        </div>
      )}

      <div className='flex flex-col gap-3'>
        <SectionTitle>CBUs registrados</SectionTitle>

        <div className='w-full lg:max-w-[64%] border border-menta-600 rounded-lg p-3 text-sm flex gap-3'>
          <Info
            color='#00ab01'
            strokeWidth={0.6}
            size={80}
          />
          <p className='w-full'>
            Para recibir pagos de <b>Reintegros</b> por <b>Transferencia</b> es necesario contar con un <b>CBU</b>. Puede registrar un nuevo CBU y definirlo como predeterminado
            para próximos reintegros, elegir uno ya registrado o ingresar un nuevo CBU al momento de realizar una solicitud de reintegro.
          </p>
        </div>
        <div className='flex flex-col lg:flex-row gap-3'>
          <Select
            className='w-full lg:max-w-[64%]'
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? '#00ab01' : '#cecece',
                height: '52px',
                borderRadius: '8px',
                boxShadow: 'none'
              })
            }}
            placeholder='Seleccione un CBU por default o registre un nuevo CBU'
            options={cbuOptions}
            defaultValue={defaultOption}
            onChange={handleChange}
          />
          {defaultCbu && (
            <Button
              style='outln'
              onClick={() => setEditarModalOnOff(true)}
            >
              Editar
            </Button>
          )}
          <Button onClick={() => setCBUModalOnOff(true)}>Registrar CBU</Button>
        </div>
      </div>
      {CBUModalOnOff && <ModalRegistrarEditarCBU setIsOpen={setCBUModalOnOff} />}
      {editarModalOnOff && (
        <ModalRegistrarEditarCBU
          setIsOpen={setEditarModalOnOff}
          cbuActual={{
            nombre: defaultCbu?.nombre,
            apellido: defaultCbu?.apellido,
            nroCBU: defaultCbu?.cbu,
            tipoDeCuenta: defaultCbu?.tipoDeCuenta,
            cuilOCuit: defaultCbu?.cuil
          }}
        />
      )}
    </div>
  );
}

export default MiCuenta;
