function FiltroEstados({ handleChange }) {
    return (
        <div className="h-fit flex gap-2 w-[17.4rem]">
            <label htmlFor="verEstados" className="text-menta-600">Ver</label>
            <select className="w-full" name="verEstados" id="verEstados" onChange={handleChange}>
                   <option className="py-2 px-3" value="Todos" >Todos</option>
                    <option className="py-2 pr-4 px-3" value="Pendientes de procesamiento">Pendientes de procesamiento</option>
                    <option className="py-2 px-3" value="Observados">Observados</option>
                    <option className="py-2 px-3" value="Rechazados última semana">Rechazados última semana</option>
                    <option className="py-2 px-3" value="Aceptados última semana">Aceptados última semana</option>
            </select>
        </div>
    )

}

export default FiltroEstados;