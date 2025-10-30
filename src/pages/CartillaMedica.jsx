import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Form from "../components/Form";
import PrestadorCard from "../components/cards/cards/PrestadorCard";
import {
  useGetEspecialidades,
  useGetLocalidades,
  useGetPrestadores,
} from "../services/prestadoresQueries";

function CartillaMedica() {
  const [especialidad, setEspecialidad] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [filters, setFilters] = useState(null);
  const { data: especialidades = [], isLoading: loadingEsp } =
    useGetEspecialidades();
  const { data: localidades = [], isLoading: loadingLoc } = useGetLocalidades();

  const {
    data: prestadores = [],
    isLoading: loadingPrestadores,
    isFetching,
  } = useGetPrestadores(filters);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters({
      especialidad: especialidad === "todas" ? "" : especialidad,
      localidad: localidad === "todas" ? "" : localidad,
    });
  };

  if (loadingEsp || loadingLoc) return <div>Cargando...</div>

  return (
    <div className='mb-5'>
      <SectionTitle>Cartilla Médica</SectionTitle>

      <Form
        onSubmit={handleSubmit}
        className="mt-6 border-none shadow-none bg-transparent p-0"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Localidad  */}
          <div className="flex flex-col flex-1">
            <label className=" font-bold text-menta-600 text-lg">
              Localidad
            </label>
            <select
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full bg-white"
              disabled={loadingLoc}
            >
              <option disabled value="" className="text-gray-400 px-2 py-1">
                Seleccionar
              </option>
              <option value="todas" className='px-2 py-1'>Todas</option>
              {localidades?.map((l) => (
                <option key={l} value={l} className='px-2 py-1'>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Especialidad  */}
          <div className="flex flex-col flex-1">
            <label className=" font-bold text-menta-600 text-lg">
              Especialidad
            </label>
            <select
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              className="mt-1 border border-gray-300 rounded-md p-2 w-full bg-white"
              disabled={loadingEsp}
            >
              <option disabled value="" className="text-gray-400 px-2 py-1">
                Seleccionar
              </option>
              <option value="todas" className='px-2 py-1'>Todas</option>
              {especialidades?.data?.map((e) => (
                <option key={e} value={e} className='px-2 py-1'>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end w-full sm:w-auto">
            <button
              type="submit"
              className="cursor-pointer w-full sm:w-auto px-6 py-2 hover:bg-menta-200 bg-menta-600 text-white rounded-md transition-colors"
            >
              Filtrar
            </button>
          </div>
        </div>
      </Form>

      <div className="mt-8">
        {filters && (loadingPrestadores || isFetching) ? (
          <p>Cargando prestadores...</p>
        ) : filters && prestadores.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prestadores.map((p) => (
              <PrestadorCard key={p._id} prestador={p} />
            ))}
          </div>
        ) : filters ? (
          <p>No se encontraron prestadores con esos filtros.</p>
        ) : null}{" "}
      </div>
    </div>
  );
}

export default CartillaMedica;
