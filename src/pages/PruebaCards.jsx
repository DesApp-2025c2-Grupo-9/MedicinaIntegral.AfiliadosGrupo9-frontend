/* eslint-disable react/no-unescaped-entities */
import { AutorizacionCard, RecetaCard, ReintegroCard, TurnosCard, AfiliadoCard, CartillaCard } from '../components/cards'


function PruebaCards() {
  const turno = {
    especialidad: "Oftalmología",
    profesional: "Merlina Addams",
    fecha: new Date("1969-12-31T17:00:00"),
    lugar: "Centro Medicina Integral",
    direccion: "Arias 2030, Castelar",
    telefono: "11 3475 9678"
  };
  const recetaPendiente = {
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'pendiente'
  }
  const recetaAceptada = {
    medicamento: 'Loplac 50mg',
    //Tipo
    cantidad: 2,
    presentacion: 'Pastillas',//tipo
    detalleMedicamento: '30 unidades por caja',
    estado: 'aceptado'
  }
  const recetaObservadaRechazada = {
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'rechazado'
  }
  const reintegroPendiente ={
    fechaDePrestacion: new Date("1969-12-31T17:00:00"),
    paraAfiliado : 'Mary Jane',
    medico : 'Merlina Addams',
    especialidad : 'Oftalmologia',
    lugarDeAtencion : 'Centro Medicina Integral',
    factura :{
      valorTotal : '130.000'
    },
    formaDePago: 'Efectivo',
    estado : 'pendiente'
  }
  const reintegroObservadoRechazado ={
    fechaDePrestacion: new Date("1969-12-31T17:00:00"),
    paraAfiliado : 'Mary Jane',
    medico : 'Merlina Addams',
    especialidad : 'Oftalmologia',
    lugarDeAtencion : 'Centro Medicina Integral',
    factura :{
      valorTotal : '130.000'
    },
    formaDePago: 'Efectivo',
    estado: 'rechazado'
  }
  const reintegroAceptado ={
    fechaDePrestacion: new Date("1969-12-31T17:00:00"),
    paraAfiliado : 'Mary Jane',
    medico : 'Merlina Addams',
    especialidad : 'Oftalmologia',
    lugarDeAtencion : 'Centro Medicina Integral',
    factura :{
      valorTotal : '130.000'
    },
    formaDePago: 'Efectivo',
    estado: 'aceptado'
  }
  const autorizacionPendiente = {
    especialidad : "Oftalmologia",
    medico : "Merlina Addams",
    fecha : new Date("1969-12-31T17:00:00"),
    lugar : 'Centro Medicina Integral',
    direccion : 'Arias 2030, Castelar',
    diasInternacion : 5,
    estado : 'pendiente'
  }
  const autorizacionObservadoRechazado = {
    especialidad : "Oftalmologia",
    medico : "Merlina Addams",
    fecha : new Date("1969-12-31T17:00:00"),
    lugar : 'Centro Medicina Integral',
    direccion : 'Arias 2030, Castelar',
    diasInternacion : 5,
    estado : 'rechazado'
  }
  const autorizacionAceptado = {
    especialidad : "Oftalmologia",
    medico : "Merlina Addams",
    fecha : new Date("1969-12-31T17:00:00"),
    lugar : 'Centro Medicina Integral',
    direccion : 'Arias 2030, Castelar',
    diasInternacion : 5,
    estado : 'aceptado'
  }
  const afiliado01 = {
    nroAfiliado : '1234567-01',
    nombre: 'Jane Doe',
    planMedico : 'Oro',
    dni : '13123123',
    email : 'alguien@example.com',
    situacionTerapeutica: [
      'Miopia', 'Astigmatismo'
    ]
  }
  const afiliado02 = {
    nroAfiliado : '1234567-02',
    nombre: 'Clara Doe',
    planMedico : 'Oro',
    dni : '13123125',
    email : 'alguien@example.com',
    situacionTerapeutica: [
      'Miopia'
    ]
  }
  const prestacion = {
    medico: 'Merlina Addams',
    especialidad: 'Oftalmología',
    lugar: 'Centro Medicina Integral',
    direccion: 'Arias 2030, Castelar',
    telefono: '1134759678'
  }
  return (
    <div className='grid grid-cols-auto grid-rows-2 '>
      <div className='col-start-1 border-2 p-2'>
        <h1>Turno "Buscar turnos"</h1>
        <TurnosCard turno={turno}></TurnosCard>
        <h1>Turno "Mis turnos"</h1>
        <TurnosCard turno={turno} paciente={true}></TurnosCard>
      </div>
      <div className='col-start-2 border-2 p-2'>
        <h1>Receta aceptada</h1>
        <RecetaCard receta={recetaAceptada} />

        <h1>Receta pendiente</h1>
        <RecetaCard receta={recetaPendiente} />

        <h1>Receta rechazada/observada</h1>
        <RecetaCard receta={recetaObservadaRechazada} />
      </div>
      <div className='col-start-1 row-start-2 border-2 p-2'>
        <h1>Reintegro Pendiente</h1>
        <ReintegroCard reintegro={reintegroPendiente}/>
        <h1>Reintegro rechazado/observado</h1>
        <ReintegroCard reintegro={reintegroObservadoRechazado}/>
        <h1>Reintegro Aceptado</h1>
        <ReintegroCard reintegro={reintegroAceptado}/>
      </div>
      <div className='col-start-2 row-start-2 border-2 p-2'>
        <h1>Autorización pendiente</h1>
        <AutorizacionCard autorizacion = {autorizacionPendiente}/>
        <h1>Autorización rechazado/observado</h1>
        <AutorizacionCard autorizacion = {autorizacionObservadoRechazado}/>
        <h1>Autorización Aceptado</h1>
        <AutorizacionCard autorizacion = {autorizacionAceptado}/>
      </div>
      <div className='col-start-1 col-end-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1'>
        <div className='col-start-1'>
        <h1>Receta aceptada</h1>
        <RecetaCard receta={recetaAceptada} dashboard={true} />
        </div>
        <div className='col-start-2'>

        <h1>Reintegro rechazado/observado</h1>
        <ReintegroCard reintegro={reintegroPendiente} dashboard = {true}/>
        </div>
        <div>

        <h1>Autorización pendiente</h1>
        <AutorizacionCard autorizacion = {autorizacionPendiente} dashboard = {true}/>
        </div>

      </div>
      <div>
        <h1>Afiliado Cards</h1>
        <AfiliadoCard afiliado={afiliado01}/>
        <AfiliadoCard afiliado={afiliado02}/>
      </div>
      <div>
        <h1>Cartilla card</h1>
        <CartillaCard prestacion = {prestacion}/>
      </div>
    </div>
  )
}

export default PruebaCards