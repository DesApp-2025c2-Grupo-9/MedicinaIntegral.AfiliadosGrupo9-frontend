import { useEffect, useState } from "react";
import { obtenerMiCuenta } from "../services/api";
import SectionTitle from "../components/SectionTitle";
import Button from '../components/Button';
import { AfiliadoCard } from "../components/cards";
import ModalRegistrarCBU from "../components/ModalRegistrarCBU/ModalRegistrarCBU";
import Select from 'react-select';
import Swal from 'sweetalert2';

function MiCuenta() {
  const [CBUModalOnOf, setCBUModalOnOf] = useState(false);
  const [selectedCBU, setSelectedCBU] = useState("");
  const [afiliado, setAfiliado] = useState(null);
  const [grupoFamiliar, setGrupoFamiliar] = useState([]);
  const [cbusGrupoFamiliar, setCbusGrupoFamiliar] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const { afiliado, grupoFamiliar } = await obtenerMiCuenta();
        setAfiliado(afiliado);
        setGrupoFamiliar(grupoFamiliar);

        const cbus = [
          ...grupoFamiliar.flatMap(obtenerCBU),
          ...obtenerCBU(afiliado)
        ];
        setCbusGrupoFamiliar(cbus);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    cargarDatos();
  }, []);

  function obtenerCBU(afiliado) {
    if (!afiliado || !Array.isArray(afiliado.cbus)) return [];
      return afiliado.cbus.map(cbu => {
        const cbuFormateado = cbu.cbu.length > 8
          ? `${cbu.cbu.slice(0, 8)}-${cbu.cbu.slice(8)}`
          : cbu.cbu;
        return [`${cbu.nombre} ${cbu.apellido}`, cbuFormateado];
      });

  }

  function agregarNuevoCBU(nombreCompleto, cbu) {
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
  }

  return (
    <div>
      <SectionTitle>Mi cuenta</SectionTitle>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {afiliado && <AfiliadoCard afiliado={afiliado} />}
      </div>

      <SectionTitle>Grupo familiar</SectionTitle>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {grupoFamiliar.map((afiliado) => (
          <AfiliadoCard afiliado={afiliado} key={afiliado.nroAfiliado} />
        ))}
      </div>

      <SectionTitle>CBUs Registrados</SectionTitle>
      <div className="flex items-center gap-4 mt-4">
        <Select
          options={cbusGrupoFamiliar.map(([nombreCompleto, cbu]) => ({
            label: `${nombreCompleto}: ${cbu}`,
            value: cbu
          }))}
          onChange={(selectedOption) => setSelectedCBU(selectedOption.value)}
          className="w-100 max-w-xl"
          placeholder="Seleccioná un CBU..."
        />
        <Button onClick={() => setCBUModalOnOf(!CBUModalOnOf)}>
          Registrar nuevo CBU
        </Button>
      </div>

      {CBUModalOnOf && (
        <ModalRegistrarCBU
          isOpen={CBUModalOnOf}
          setIsOpen={setCBUModalOnOf}
          onRegistrarCBU={agregarNuevoCBU}
        />
      )}
    </div>
  );
}

export default MiCuenta;