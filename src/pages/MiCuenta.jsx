import SectionTitle from "../components/SectionTitle"
import Button from '../components/Button'
import { AfiliadoCard } from "../components/cards"
import ModalRegistrarCBU from "../components/ModalRegistrarCBU/ModalRegistrarCBU"
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axios from 'axios';



function MiCuenta() {
  const token = localStorage.getItem('token');
  const [afiliado, setAfiliado] = useState(null);
  const [grupoFamiliar, setGrupoFamiliar] = useState([]);
  const [cbusGrupoFamiliar, setCbusGrupoFamiliar] = useState([]);
  const [CBUModalOnOf, setCBUModalOnOf] = useState(false);
  const [selectedCBU, setSelectedCBU] = useState("");
  

  useEffect(() => {
    async function fetchMiCuenta() {
    try {
      const response = await axios.get('/api/mi-cuenta', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Respuesta del backend:', response.data);

      const { afiliado, grupoFamiliar } = response.data;

      setAfiliado(afiliado);
      setGrupoFamiliar(Array.isArray(grupoFamiliar) ? grupoFamiliar : []);

      const cbus = [
        ...(Array.isArray(grupoFamiliar) ? grupoFamiliar.flatMap(obtenerCBU) : []),
        ...(afiliado ? obtenerCBU(afiliado) : [])
      ];
      setCbusGrupoFamiliar(cbus);
    } catch (error) {
      console.error('Error al obtener datos de mi cuenta:', error);
    }
  }

  fetchMiCuenta();
 }, []);

  

  async function agregarNuevoCBU(nombreCompleto, cbu) {
  try {
    const partes = nombreCompleto.trim().split(' ');
    const nombre = partes.slice(0, -1).join(' ');
    const apellido = partes.slice(-1).join('');

    const nuevoCBU = {
      nombre,
      apellido,
      cbu,
      tipoDeCuenta: 'Cuenta corriente',
      cuil: '20131231250'
    };

    await axios.post('/api/registrar-cbu', nuevoCBU, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCbusGrupoFamiliar(prev => [...prev, [nombreCompleto, cbu]]);

    Swal.fire({
      title: 'Registro exitoso',
      text: 'El CBU fue registrado correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      width: '400px',
      customClass: {
        popup: 'swal-popup-small',
        title: 'swal-title-small',
        confirmButton: 'swal-button-small'
      }
    });
  } catch (error) {
    console.error('Error al registrar CBU:', error);
    Swal.fire({
      title: 'Error',
      text: 'No se pudo registrar el CBU',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}


  function obtenerCBU(afiliado) {
  if (!afiliado || !Array.isArray(afiliado.cbus)) return [];

  return afiliado.cbus.map(cbu => {
    const cbuFormateado = cbu.cbu.length > 8
      ? `${cbu.cbu.slice(0, 8)}-${cbu.cbu.slice(8)}`
      : cbu.cbu;

    return [`${cbu.nombre} ${cbu.apellido}`, cbuFormateado];
  });
}



  return (
    <div>
      <div>
      <SectionTitle>Mi cuenta</SectionTitle>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {afiliado ? (
          <AfiliadoCard afiliado={afiliado} />
        ) : (
          <p>No se encontraron datos del afiliado.</p>
        )}
      </div>



      </div>
      <div>
      <SectionTitle>Grupo familiar</SectionTitle>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.isArray(grupoFamiliar) && grupoFamiliar.length > 0 ? (
          grupoFamiliar.map((afiliado) => (
            <AfiliadoCard afiliado={afiliado} key={afiliado.nroAfiliado} />
          ))
        ) : (
          <p>No hay integrantes del grupo familiar.</p>
        )}
      </div>




    </div>
      <SectionTitle>CBUs Registrados</SectionTitle>
        <div className="flex items-center gap-4 mt-4">
          
          <Select
            options={
              Array.isArray(cbusGrupoFamiliar)
                ? cbusGrupoFamiliar.map(([nombreCompleto, cbu]) => ({
                    label: `${nombreCompleto}: ${cbu}`,
                    value: cbu
                  }))
                : []
            }
            onChange={(selectedOption) => setSelectedCBU(selectedOption.value)}
            className="w-100 max-w-xl"
            placeholder="Seleccioná un CBU..."
          />

          <Button onClick={()=> {setCBUModalOnOf(!CBUModalOnOf)}}>Registrar nuevo CBU</Button>
        </div>
      {CBUModalOnOf && (
      <ModalRegistrarCBU
        isOpen={CBUModalOnOf}
        setIsOpen={setCBUModalOnOf}
        onRegistrarCBU={agregarNuevoCBU}
      />
)}

    </div>
  )
}

export default MiCuenta
