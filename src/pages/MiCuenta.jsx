import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { AfiliadoCard } from '../components/cards';
import ModalRegistrarCBU from '../components/ModalRegistrarCBU/ModalRegistrarCBU';
import Select from 'react-select';
import { useState } from 'react';
import { useGetMiCuenta, useSetCbuPrincipal } from '../services/miCuentaQueries';
import { Navigate } from 'react-router-dom';

function MiCuenta() {
  const [CBUModalOnOf, setCBUModalOnOf] = useState(false);
  const { data, isLoading, isError, error } = useGetMiCuenta();
  const { mutateAsync } = useSetCbuPrincipal();

  if (isLoading) return <div>Cargando...</div>;
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
    <div>
      <div>
        <SectionTitle>Mi cuenta</SectionTitle>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>{afiliado ? <AfiliadoCard afiliado={afiliado} /> : <p>No se encontraron datos del afiliado.</p>}</div>
      </div>

      {afiliado.grupoFamiliar.length > 1 && (
        <div>
          <SectionTitle>Grupo familiar</SectionTitle>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
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

      <SectionTitle>CBUs Registrados</SectionTitle>
      <div className='flex items-center gap-4 mt-4'>
        <Select
          options={afiliado.cbus.map(cbu => ({
            label: `${cbu.nombre} ${cbu.apellido}: ${cbu.cbu}`,
            value: cbu.cbu
          }))}
          defaultInputValue={
            defaultCbu
              ? `${defaultCbu.nombre} ${defaultCbu.apellido}: ${defaultCbu.cbu}`
              : ''
          }

          onChange={selectedOption => handleChange({ nroCbu: selectedOption.value })}
          className='w-100 max-w-xl'
          placeholder='Selecciona un CBU'
        />

        <Button
          onClick={() => {
            setCBUModalOnOf(true);
          }}
        >
          Registrar nuevo CBU
        </Button>
      </div>
      {CBUModalOnOf && (
        <ModalRegistrarCBU
          isOpen={CBUModalOnOf}
          setIsOpen={setCBUModalOnOf}
        />
      )}
    </div>
  );
}

export default MiCuenta;
