import SectionTitle from "../components/SectionTitle"
import Button from '../components/Button'
import { AfiliadoCard } from "../components/cards"


function MiCuenta() {
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
        <AfiliadoCard afiliado={afiliado} />
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
        <Button>Registrar nuevo CBU</Button>
      </div>

    </>
  )
}

export default MiCuenta