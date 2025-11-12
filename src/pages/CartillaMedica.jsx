import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Form from "../components/Form";
import Button from "../components/Button";
import PrestadorCard from "../components/cards/cards/PrestadorCard";
import {
  useGetEspecialidades,
  useGetLocalidades,
  useGetPrestadores,
} from "../services/prestadoresQueries";

const INITIAL_STATE_FORM = {
  localidad: "",
  especialidad: "",
};

function CartillaMedica() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formFilters, setFormFilters] = useState(INITIAL_STATE_FORM);
  const [filters, setFilters] = useState(INITIAL_STATE_FORM);

  // Consultas
  const { data: especialidadesData = [], isLoading: loadingEsp } =
    useGetEspecialidades();
  const { data: localidadesData = [], isLoading: loadingLoc } =
    useGetLocalidades();

  const especialidades = especialidadesData?.data || [];
  const localidades = localidadesData || [];

  const { data: prestadores = [], isLoading: loadingPrestadores } =
    useGetPrestadores(filters);

  // Inicializar filtros desde la URL
  useEffect(() => {
    if (loadingEsp || loadingLoc) return;

    const localidadParam = searchParams.get("localidad") || "";
    const especialidadParam = searchParams.get("especialidad") || "";

    const localidadValida = localidades.includes(localidadParam)
      ? localidadParam
      : "";
    const especialidadValida = especialidades.includes(especialidadParam)
      ? especialidadParam
      : "";

    const newFilters = {
      localidad: localidadValida,
      especialidad: especialidadValida,
    };

    setFormFilters(newFilters);
    setFilters(newFilters);
  }, [searchParams, localidades, especialidades, loadingEsp, loadingLoc]);

  const filtrosCompletos = formFilters.localidad && formFilters.especialidad;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filtrosCompletos) return;

    setSearchParams(formFilters);
    setFilters(formFilters);
  };

  const hayFiltrosActivos = filters.localidad && filters.especialidad;

  return (
    <div className="mb-4 flex flex-col gap-5">
      <SectionTitle>Cartilla Médica</SectionTitle>

      <div className="flex flex-col gap-4">
        <Form
          onSubmit={handleSubmit}
          className="border-none shadow-none bg-transparent p-0"
        >
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Localidad */}
            <div className="flex flex-col flex-1">
              <label className="font-bold text-menta-600 text-lg">
                Localidad
              </label>
              <select
                value={formFilters.localidad}
                onChange={(e) =>
                  setFormFilters((prev) => ({
                    ...prev,
                    localidad: e.target.value,
                  }))
                }
                className={`mt-1 border border-gray-300 rounded-md p-2 w-full bg-white ${
                  formFilters.localidad === "" ? "text-gray-400" : "text-black"
                } hover:border-menta-400 focus:border-menta-600 focus:ring-menta-300`}
                disabled={loadingLoc}
              >
                <option value="" disabled hidden className="px-2 pt-1">
                  Seleccionar
                </option>
                {localidades.map((l, i) => (
                  <option key={i} value={l} className="px-2 pt-1">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidad */}
            <div className="flex flex-col flex-1">
              <label className="font-bold text-menta-600 text-lg">
                Especialidad
              </label>
              <select
                value={formFilters.especialidad}
                onChange={(e) =>
                  setFormFilters((prev) => ({
                    ...prev,
                    especialidad: e.target.value,
                  }))
                }
                className={`mt-1 border border-gray-300 rounded-md p-2 w-full bg-white ${
                  formFilters.especialidad === ""
                    ? "text-gray-400"
                    : "text-black"
                } hover:border-menta-400 focus:border-menta-600 focus:ring-menta-300`}
                disabled={loadingEsp}
              >
                <option value="" disabled hidden className="px-2 pt-1">
                  Seleccionar
                </option>
                {especialidades.map((e, i) => (
                  <option key={i} value={e} className="px-2 pt-1 ">
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

        <div>
          {!hayFiltrosActivos && (
            <p className="text-gray-500 text-sm">
              Seleccione una localidad y una especialidad para comenzar la
              búsqueda.
            </p>
          )}

          {hayFiltrosActivos && loadingPrestadores && (
            <p>Cargando prestadores...</p>
          )}

          {hayFiltrosActivos &&
            !loadingPrestadores &&
            prestadores.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {prestadores.map((p, i) => (
                  <PrestadorCard
                    key={p._id ?? `${p.nombre}-${i}`}
                    prestador={p}
                  />
                ))}
              </div>
            )}

          {hayFiltrosActivos &&
            !loadingPrestadores &&
            prestadores.length === 0 && (
              <p>No se encontraron prestadores con esos filtros.</p>
            )}
        </div>
      </div>
    </div>
  );
}

export default CartillaMedica;
