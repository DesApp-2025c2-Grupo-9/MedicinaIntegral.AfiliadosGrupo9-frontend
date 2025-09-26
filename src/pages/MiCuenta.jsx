import SectionTitle from "../components/SectionTitle"
import Button from '../components/Button'
import { AfiliadoCard } from "../components/cards"
import { useState } from "react"
import ModalRegistrarCBU from "../components/ModalRegistrarCBU/ModalRegistrarCBU"


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
    ]
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
      ]
    }, {
      nroAfiliado: '1234567-03',
      nombre: 'Juan Doe',
      planMedico: 'Oro',
      dni: '13123125',
      email: 'alguien@example.com',
      situacionTerapeutica: [
      ]
    }
  ]
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
        <Button onClick={()=> {setCBUModalOnOf(!CBUModalOnOf)}}>Registrar nuevo CBU</Button>
      </div>
      {CBUModalOnOf && <ModalRegistrarCBU/>}

    </>
  )
}

export default MiCuenta