import { AutorizacionCard, RecetaCard, ReintegroCard, TurnosCard } from '../components/cards'
function PruebaCards() {
    const turno =  {
    especialidad: "Oftalmología",
    profesional: "Merlina Addams",
    fecha: new Date("1969-12-31T17:00:00"),
    lugar: "Centro Medicina Integral",
    direccion: "Arias 2030, Castelar",
    telefono: "11 3475 9678"
  };
    const recetaPendiente = {
      medicamento : 'Loplac 50mg',
      cantidad : '2 cajas',
      presentacion : 'Pastillas',
      detalleMedicamento : '30 unidades por caja',
      estado : 'Pendiente'
    }
    const recetaAceptada = {
      medicamento : 'Loplac 50mg',
      cantidad : '2 cajas',
      presentacion : 'Pastillas',
      detalleMedicamento : '30 unidades por caja',
      estado : 'Aceptada'
    }
    const recetaObservadaRechazada = {
      medicamento : 'Loplac 50mg',
      cantidad : '2 cajas',
      presentacion : 'Pastillas',
      detalleMedicamento : '30 unidades por caja',
      estado : 'Observada'
    }



    return (
        <>
        <div>
          <h1>Turno Disponible</h1>
          <TurnosCard turno={turno}></TurnosCard>
        </div>
        <div>
          <h1>Turno propio</h1>
          <TurnosCard turno={turno} paciente={true}></TurnosCard>
        </div>
        <div>
          <h1>Receta aceptada</h1>
          <RecetaCard receta={recetaAceptada}/>
        </div>
        <div>
          <h1>Receta pendiente</h1>
          <RecetaCard receta={recetaPendiente}/>
        </div>
        <div>
          <h1>Receta rechazada/observada</h1>
          <RecetaCard receta={recetaObservadaRechazada}/>
        </div>
            <ReintegroCard />
        </>
    )
}

export default PruebaCards