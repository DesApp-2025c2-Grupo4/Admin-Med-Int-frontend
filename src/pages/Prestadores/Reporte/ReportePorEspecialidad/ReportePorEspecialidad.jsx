import { useState } from "react";
import { ReporteContainer } from "../../../../components/ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../../../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/Loader/Loader.jsx";
import { useGetAllPrestadores } from "../../../../hooks/useGetAllPrestadores.jsx";

export function ReportePorEspecialidad() {
  const [loading, setLoading] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const navigate = useNavigate();

  const { prestadores, loadingPrestadores, error } = useGetAllPrestadores();

  //obtener todas las especialidades (simulación)
  const getAllEspecialidades = () => {
    if (!prestadores) return [];

    const especialidadesUnicas = new Map();
    prestadores.forEach(prestador => {
      prestador.especialidad?.forEach(esp => {
        if (!especialidadesUnicas.has(esp.especialidadId)) {
          especialidadesUnicas.set(esp.especialidadId, esp);
        }
      });
    });

    const especialidadesArray = Array.from(especialidadesUnicas.values());

    // Agregar especialidades que no tienen prestadores (simulación)
    especialidadesArray.push(
      { especialidadId: 99, descripcion: "Neurología" },
      { especialidadId: 100, descripcion: "Urología" }
    );

    // Ordenar
    return especialidadesArray.sort((a, b) => 
      a.descripcion.localeCompare(b.descripcion)
    );
  };

  const especialidades = getAllEspecialidades();

  const handleGenerarReporte = async () => {
    setLoading(true);
    try {
      // Filtrar prestadores por especialidad seleccionada
      const prestadoresFiltrados = prestadores.filter(prestador =>
        prestador.especialidad?.some(
          esp => esp.especialidadId === parseInt(especialidadSeleccionada)
        )
      );

      // Obtener el nombre de la especialidad
      const especialidadObj = especialidades.find(
        esp => esp.especialidadId === parseInt(especialidadSeleccionada)
      );

      navigate("reporte-cantidad-por-especialidad-generado", {
        state: {
          prestadores: prestadoresFiltrados,
          especialidad: especialidadObj?.descripcion || "",
          especialidadId: parseInt(especialidadSeleccionada)
        },
      });
    } catch (err) {
      console.error("Error al generar reporte:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEspecialidad = (e) => {
    setEspecialidadSeleccionada(e.target.value);
  };

  return (
    <ReporteContainer title="Reporte de prestadores por especialidad">
      <div className="inputs-container">
        {loadingPrestadores ? (
          <Loader />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="input-group">
              <label htmlFor="especialidad">Seleccionar Especialidad:</label>
              <select
                id="especialidad"
                value={especialidadSeleccionada}
                onChange={handleChangeEspecialidad}
                disabled={loading}
              >
                <option value="">Seleccione una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.especialidadId} value={esp.especialidadId}>
                    {esp.descripcion}
                  </option>
                ))}
              </select>
            </div>

            {especialidadSeleccionada && !loading && (
              <Button text="Generar reporte" onClick={handleGenerarReporte} />
            )}
            {loading && <Loader />}
          </>
        )}
      </div>
    </ReporteContainer>
  );
}
