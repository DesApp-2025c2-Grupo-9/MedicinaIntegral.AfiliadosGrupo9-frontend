import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import Form from "../components/Form";
import Button from "../components/Button";
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
  const filtrosCompletos = especialidad !== "" && localidad !== "";
  // Resetear filtros al entrar a la página
  useEffect(() => {
    setEspecialidad("");
    setLocalidad("");
    setFilters(null);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filtrosCompletos) return;
    setFilters({
      especialidad,
      localidad,
    });
  };

  //if (loadingEsp || loadingLoc) return <div>Cargando...</div>;

  return (
    <div className="mb-5">
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
              className={`
    mt-1 border border-gray-300 rounded-md p-2 w-full bg-white
    ${localidad === "" ? "text-gray-400" : "text-black"}
        hover:border-menta-400 focus:border-menta-600 focus:ring-menta-300 
  `}
              disabled={loadingLoc}
            >
              <option value="" disabled hidden>
                Seleccionar
              </option>

              {localidades.map((l, i) => (
                <option key={`${l}-${i}`} value={l} className="px-3 py-1">
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
              className={`
                  mt-1 border border-gray-300 rounded-md p-2 w-full bg-white
                  ${especialidad === "" ? "text-gray-400" : "text-black"}
                  hover:border-menta-400 focus:border-menta-600 focus:ring-menta-300 
                  `}
              disabled={loadingEsp}
            >
              <option value="" disabled hidden>
                Seleccionar
              </option>

              {especialidades?.data?.map((e) => (
                <option key={e} value={e} className="px-2 py-1">
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end w-full sm:w-auto">
            <Button
              type="submit"
              state={filtrosCompletos ? "active" : "disabled"}
              style="fill"
              className="w-full sm:w-auto py-2 min-h-[42px]"
            >
              Buscar
            </Button>
          </div>
        </div>
      </Form>

      <div className="mt-8">
        {!filtrosCompletos && (
          <p className="text-gray-500 text-sm mt-2">
            Seleccione una localidad y una especialidad para comenzar la
            búsqueda.
          </p>
        )}

        {filters && (loadingPrestadores || isFetching) ? (
          <p>Cargando prestadores...</p>
        ) : filters && prestadores.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prestadores.map((p, i) => (
              <PrestadorCard key={p._id ?? `${p.nombre}-${i}`} prestador={p} />
            ))}
          </div>
        ) : filters ? (
          <p>No se encontraron prestadores con esos filtros.</p>
        ) : null}
      </div>
    </div>
  );
}

export default CartillaMedica;
