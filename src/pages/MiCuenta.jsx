import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { AfiliadoCard } from '../components/cards';
import ModalRegistrarCBU from '../components/ModalRegistrarCBU/ModalRegistrarCBU';
import Select from 'react-select';
import { useState } from 'react';
import { useGetMiCuenta, useSetCbuPrincipal } from '../services/miCuentaQueries';
import { Navigate } from 'react-router-dom';
import MiCuentaSkeleton from '../components/Skeletons/MiCuentaSkeleton';
import ModalEditarEliminarCBU from '../components/ModalRegistrarCBU/ModalEditarEliminarCBU';
import { editarCbuApi, eliminarCbuApi } from '../api/axios';



function MiCuenta() {
  const [CBUModalOnOf, setCBUModalOnOf] = useState(false);
  const [editarModalOnOff, setEditarModalOnOff] = useState(false);
  const [cbuSeleccionado, setCbuSeleccionado] = useState(null);
  const { data, isLoading, isError, error } = useGetMiCuenta();
  const { mutateAsync } = useSetCbuPrincipal();

  if (isLoading) return <MiCuentaSkeleton />;
  if (isError && error.status === 401) {
    // Si el refresh token está vencido (401), redirigimos a /login para autenticarse
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }
  if (isError) return <div>Error: {error.message}</div>;

  const afiliado = data?.data;
  const defaultCbu = afiliado?.cbus?.find(cbu => cbu.cbu === afiliado?.cbuPrincipal);
  const handleChange = async data => {
    try {
      await mutateAsync(data);
      console.log('Cambio exitoso');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
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

      <div className='flex flex-col gap-2'>
        <SectionTitle>CBUs Registrados</SectionTitle>
        <div className='flex gap-3'>
          <Select
            options={afiliado.cbus.map(cbu => ({
              label: `${cbu.nombre} ${cbu.apellido}: ${cbu.cbu}`,
              value: cbu.cbu
            }))}
            defaultInputValue={defaultCbu ? `${defaultCbu.nombre} ${defaultCbu.apellido}: ${defaultCbu.cbu}` : ''}
            onChange={selectedOption => {
              handleChange({ nroCbu: selectedOption.value });
              const seleccionado = afiliado.cbus.find(cbu => cbu.cbu === selectedOption.value);
              setCbuSeleccionado(seleccionado);
            }}

          />

          <Button
            onClick={() => {
              setCBUModalOnOf(true);
            }}
          >
            Registrar nuevo CBU
          </Button>

          <Button
            onClick={() => {
              if (cbuSeleccionado) {
                setEditarModalOnOff(true);
              }
            }}
            disabled={!cbuSeleccionado}
          >
            Editar
          </Button>

          



        </div>
      </div>
      {CBUModalOnOf && (
        <ModalRegistrarCBU
          isOpen={CBUModalOnOf}
          setIsOpen={setCBUModalOnOf}
        />
      )}
      {editarModalOnOff && (
      <ModalEditarEliminarCBU
        isOpen={editarModalOnOff}
        setIsOpen={setEditarModalOnOff}
        cbuActual={cbuSeleccionado}
      />
    )}

    </div>
  );
}

export default MiCuenta;
