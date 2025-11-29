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
import { icons } from "../utils/icons";
import { FileSearch2 } from "lucide-react";

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
            <div className="flex flex-col flex-1 gap-1">
              <label className="font-bold text-menta-600 text-lg">
                Localidad:
              </label>
              <select
                value={formFilters.localidad}
                onChange={(e) =>
                  setFormFilters((prev) => ({
                    ...prev,
                    localidad: e.target.value,
                  }))
                }
                className={`border border-gris-border rounded-md p-3 pl-4 w-full bg-white ${
                  formFilters.localidad === ""
                    ? "text-gris-placeholder"
                    : "text-black"
                } hover:border-menta-400 focus:border-menta-600 focus:ring-menta-300`}
                disabled={loadingLoc}
              >
                <option value="" disabled hidden className="p-3 pl-4">
                  Seleccionar localidad
                </option>
                {localidades.map((l, i) => (
                  <option key={i} value={l} className="p-3 pl-4">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Especialidad */}
            <div className="flex flex-col flex-1 gap-1">
              <label className="font-bold text-menta-600 text-lg">
                Especialidad:
              </label>
              <select
                value={formFilters.especialidad}
                onChange={(e) =>
                  setFormFilters((prev) => ({
                    ...prev,
                    especialidad: e.target.value,
                  }))
                }
                className={`border border-gris-border rounded-md p-3 pl-4 w-full bg-white ${
                  formFilters.especialidad === ""
                    ? "text-gris-placeholder"
                    : "text-black"
                } hover:border-menta-400 focus:border-menta-600 focus:ring-menta-300`}
                disabled={loadingEsp}
              >
                <option value="" disabled hidden className="p-3 pl-4">
                  Seleccionar especialidad
                </option>
                {especialidades.map((e, i) => (
                  <option key={i} value={e} className="p-3 pl-4">
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
                className="w-full min-h-12.5"
              >
                Buscar
              </Button>
            </div>
          </div>
        </Form>

        <div>
          {!hayFiltrosActivos && (
              <div className='flex flex-col items-center gap-5 h-70 justify-center w-full text-gris-placeholder'>
                <FileSearch2 size={108} strokeWidth={1.1} />
                <p className='text-center'>
                  Seleccione una <b>Localidad</b> y una <b>Especialidad</b> para iniciar la búsqueda.
                </p>
              </div>
            )}

          {hayFiltrosActivos && loadingPrestadores && (
            <p>Cargando...</p>
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
              <div className='flex flex-col items-center gap-5 h-70 justify-center w-full text-gris-placeholder'>
                <div className='max-w-72'>{icons.shrug}</div>
                <p className='text-center'>
                  No se encontraron <b>prestadores</b> con los filtros seleccionados.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default CartillaMedica;
