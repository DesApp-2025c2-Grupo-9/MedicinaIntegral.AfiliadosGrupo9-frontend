import SectionTitle from "../components/SectionTitle"
import Button from '../components/Button'
import { AfiliadoCard } from "../components/cards"
import { useState } from "react"
import ModalRegistrarCBU from "../components/ModalRegistrarCBU/ModalRegistrarCBU"
import ListaCbus from "../components/ListaCbus"


function MiCuenta() {
  const [CBUModalOnOf, setCBUModalOnOf] = useState(false)

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
          cbu : '1234567890123456789012'
        },{
          tipoDeCuenta : 'Cuenta corriente',
          cuil : '20131231250',
          nombre : 'Jane',
          apellido : 'Doe',
          cbu : '1234567890123456789033'
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
          cbu : '1234567890123456789444'
        },{
          tipoDeCuenta : 'Cuenta corriente',
          cuil : '20131231250',
          nombre : 'Clara',
          apellido : 'Doe',
          cbu : '1234567890123456789111'
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

  const cbusGrupoFamiliar = [
    ...grupoFamiliar.flatMap(x => obtenerCBU(x)),
    ...obtenerCBU(afiliado)
  ]

  function obtenerCBU (afiliado) {
    return afiliado.cbus.map(cbu => [`${cbu.nombre} ${cbu.apellido}`, cbu.cbu])
  }
  return (
    <>
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
      <div>
        <SectionTitle>CBUs Registrados</SectionTitle>
        <ListaCbus listaCbus={cbusGrupoFamiliar}/>
        <Button onClick={()=> {setCBUModalOnOf(!CBUModalOnOf)}}>Registrar nuevo CBU</Button>
      </div>
      {CBUModalOnOf && <ModalRegistrarCBU/>}

    </>
  )
}

export default MiCuenta