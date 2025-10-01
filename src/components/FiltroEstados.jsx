import { twMerge } from 'tailwind-merge';

const estados = [
    'Todos',
    'Pendientes de procesamiento',
    'Observados',
    'Rechazados última semana',
    'Aceptados última semana'
];

function FiltroEstados({ handleChange, className }) {
    return (
        <div className={twMerge('flex gap-2', className)}>
            <label htmlFor="verEstados" className="text-menta-600 font-bold">Ver:</label>
            <select className="cursor-pointer" name="verEstados" id="verEstados" onChange={handleChange}>
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