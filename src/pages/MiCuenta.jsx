import SectionTitle from "../components/SectionTitle"
import Button from '../components/Button'
import { AfiliadoCard } from "../components/cards"
import { useState } from "react"
import ModalRegistrarCBU from "../components/ModalRegistrarCBU/ModalRegistrarCBU"
import Select from 'react-select';
import Swal from 'sweetalert2';



function MiCuenta() {
  const [CBUModalOnOf, setCBUModalOnOf] = useState(false)
  const [selectedCBU, setSelectedCBU] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nuevoCbu, setNuevoCbu] = useState("");

  const afiliado = {
    nroAfiliado: '1234567-01',
    nombre: 'Jane Doe',
    planMedico: 'Oro',
    dni: '13123123',
    email: 'alguien@example.com',
    situacionTerapeutica: [
      'Miopia', 'Astigmatismo'
    ],
    cbus : [
        {
          tipoDeCuenta : 'Cuenta corriente',
          cuil : '20131231250',
          nombre : 'Jane',
          apellido : 'Doe',
          cbu : '12345678901123456789012'
        },{
          tipoDeCuenta : 'Cuenta corriente',
          cuil : '20131231250',
          nombre : 'Jane',
          apellido : 'Doe',
          cbu : '2323232323232323232323'
        }]
  }
  const grupoFamiliar = [
    {
      nroAfiliado: '1234567-02',
      nombre: 'Clara Doe',
      planMedico: 'Oro',
      dni: '13123125',
      email: 'alguien@example.com',
      situacionTerapeutica: [
        'Miopia'
      ],
      cbus : [
        {
          tipoDeCuenta : 'Cuenta corriente',
          cuil : '20131231250',
          nombre : 'Clara',
          apellido : 'Doe',
          cbu : '7878787878787878787878'
        },{
          tipoDeCuenta : 'Cuenta corriente',
          cuil : '20131231250',
          nombre : 'Clara',
          apellido : 'Doe',
          cbu : '9898989898989898989898'
        }
    ]
    }, {
      nroAfiliado: '1234567-03',
      nombre: 'Juan Doe',
      planMedico: 'Oro',
      dni: '13123125',
      email: 'alguien@example.com',
      situacionTerapeutica: [
      ],
      cbus : []
    }
  ]

  const [cbusGrupoFamiliar, setCbusGrupoFamiliar] = useState([
    ...grupoFamiliar.flatMap(obtenerCBU),
    ...obtenerCBU(afiliado)
  ]);

  function agregarNuevoCBU(nombreCompleto, cbu) { //agregué
  console.log("Nuevo CBU registrado:", nombreCompleto, cbu);
  setCbusGrupoFamiliar(prev => [...prev, [nombreCompleto, cbu]]);


    Swal.fire({  //agregue alerta cuando se registra un cbu
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

  function obtenerCBU (afiliado) {
    return afiliado.cbus.map(cbu => [`${cbu.nombre} ${cbu.apellido}`, cbu.cbu])
  }
  return (
    <div>
      <div>
        <SectionTitle>Mi cuenta</SectionTitle>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <AfiliadoCard afiliado={afiliado} />

        </div>
      </div>
      <div>
        <SectionTitle>Grupo familiar</SectionTitle>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {//Cargar al grupo familiar
            grupoFamiliar.map(
              (afiliado) =>
                <AfiliadoCard afiliado={afiliado} key={afiliado.nroAfiliado} />
            )
          }
        </div>
    </div>
      <SectionTitle>CBUs Registrados</SectionTitle>
        <div className="flex items-center gap-4 mt-4">
          
          <Select
            options={cbusGrupoFamiliar.map(([nombreCompleto, cbu]) => ({
              label: `${nombreCompleto} - ${cbu}`,
              value: cbu
            }))}
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