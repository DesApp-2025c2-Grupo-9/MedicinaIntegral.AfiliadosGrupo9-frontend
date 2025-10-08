import { twMerge } from 'tailwind-merge';
import { useStateFilter } from '../store/stateFilter';

const estados = [
    'Todos',
    'Pendientes de procesamiento',
    'Observados',
    'Rechazados última semana',
    'Aceptados última semana'
];

function FiltroEstados({ className }) {
    const usedFilter = useStateFilter((state) => state.updateState);

    return (
        <div className={twMerge('flex gap-2', className)}>
            <label htmlFor="verEstados" className="text-menta-600 font-bold">Ver:</label>
            <select className="cursor-pointer" name="verEstados" id="verEstados" onChange={(e) => usedFilter(e.target.value)}>
                {
                    estados.map((estado, index) =>
                        <option
                            value={estado}
                            key={index}
                            className='py-2 px-3'
                        >
                            {estado}
                        </option>
                    )
                }
            </select>
        </div>
    )
}

export default FiltroEstados;