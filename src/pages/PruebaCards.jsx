/* eslint-disable react/no-unescaped-entities */
import { AutorizacionCard, RecetaCard, ReintegroCard, TurnosCard } from '../components/cards'
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
    estado: 'Pendiente'
  }
  const recetaAceptada = {
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'Aceptado'
  }
  const recetaObservadaRechazada = {
    medicamento: 'Loplac 50mg',
    cantidad: '2 cajas',
    presentacion: 'Pastillas',
    detalleMedicamento: '30 unidades por caja',
    estado: 'Rechazado'
  }
  const reintegroPendiente ={
    fecha: new Date("1969-12-31T17:00:00"),
    integrante : 'Mary Jane',
    medico : 'Merlina Addams',
    especialidad : 'Oftalmologia',
    lugar : 'Centro Medicina Integral',
    valor : '$130.000,00',
    formaDePago: 'Efectivo',
    estado : 'Pendiente'
  }
  const reintegroObservadoRechazado ={
    fecha: new Date("1969-12-31T17:00:00"),
    integrante : 'Mary Jane',
    medico : 'Merlina Addams',
    especialidad : 'Oftalmologia',
    lugar : 'Centro Medicina Integral',
    valor : '$130.000,00',
    formaDePago: 'Efectivo',
    estado: 'Rechazado'
  }
  const reintegroAceptado ={
    fecha: new Date("1969-12-31T17:00:00"),
    integrante : 'Mary Jane',
    medico : 'Merlina Addams',
    especialidad : 'Oftalmologia',
    lugar : 'Centro Medicina Integral',
    valor : '$130.000,00',
    formaDePago: 'Efectivo',
    estado: 'Aceptado'
  }
  const autorizacionPendiente = {
    especialidad : "Oftalmologia",
    medico : "Merlina Addams",
    fecha : new Date("1969-12-31T17:00:00"),
    lugar : 'Centro Medicina Integral',
    direccion : 'Arias 2030, Castelar',
    diasInternacion : 5,
    estado : 'Pendiente'
  }
  const autorizacionObservadoRechazado = {
    especialidad : "Oftalmologia",
    medico : "Merlina Addams",
    fecha : new Date("1969-12-31T17:00:00"),
    lugar : 'Centro Medicina Integral',
    direccion : 'Arias 2030, Castelar',
    diasInternacion : 5,
    estado : 'Rechazado'
  }
  const autorizacionAceptado = {
    especialidad : "Oftalmologia",
    medico : "Merlina Addams",
    fecha : new Date("1969-12-31T17:00:00"),
    lugar : 'Centro Medicina Integral',
    direccion : 'Arias 2030, Castelar',
    diasInternacion : 5,
    estado : 'Aceptado'
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
      <div className='col-start-1 col-end-3 row-start 3 p-2'>
        <h1>Receta aceptada</h1>
        <RecetaCard receta={recetaAceptada} dashboard={true} />
        <h1>Reintegro rechazado/observado</h1>
        <ReintegroCard reintegro={reintegroObservadoRechazado} dashboard = {true}/>
        <h1>Autorización pendiente</h1>
        <AutorizacionCard autorizacion = {autorizacionPendiente} dashboard = {true}/>

      </div>
    </div>
  )
}

export default PruebaCards