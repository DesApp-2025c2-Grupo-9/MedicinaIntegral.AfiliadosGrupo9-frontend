import { twMerge } from 'tailwind-merge';

const estados = ['Todos', 'Pendientes de procesamiento', 'En análisis', 'Observados', 'Rechazados última semana', 'Aceptados última semana'];

function FiltroEstados({ className, setEstadoTramite }) {
  return (
    <div className={twMerge('flex gap-1.5', className)}>
      <label
        htmlFor='verEstados'
        className='font-bold text-menta-600'
      >
        Ver:
      </label>
      <select
        className='cursor-pointer font-bold'
        name='verEstados'
        id='verEstados'
        onChange={e => setEstadoTramite(e.target.value)}
      >
        {estados.map((estado, index) => (
          <option
            value={estado}
            key={index}
            className='py-2 px-3 font-medium'
          >
            {estado}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroEstados;
