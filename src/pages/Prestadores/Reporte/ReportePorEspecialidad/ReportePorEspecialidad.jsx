import { useState } from "react";
import { ReporteContainer } from "../../../../components/ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../../../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/Loader/Loader.jsx";
import { useGetAllEspecialidades } from "../../../../hooks/Prestador/useGetEspecialidades.jsx";
import "./ReportePorEspecialidad.css"

export function ReportePorEspecialidad() {
  const [loading, setLoading] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const navigate = useNavigate();

  const { especialidades, loadingEspecialidades, error } = useGetAllEspecialidades();

  const handleGenerarReporte = async () => {
    setLoading(true);
    try {
      const especialidadObj = especialidades.find(
        esp => esp.especialidadId === parseInt(especialidadSeleccionada)
      );

      navigate("reporte-cantidad-por-especialidad-generado", {
        state: {
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
    <ReporteContainer title="Reporte cantidad de prestadores por especialidad">
      <div className="inputs-container">
        {loadingEspecialidades ? (
          <Loader />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="input-container">
              <label htmlFor="especialidad">Seleccionar Especialidad:</label>
              <select
                id="especialidad"
                value={especialidadSeleccionada}
                onChange={handleChangeEspecialidad}
                disabled={loading}
              >
                <option value="">Especialidad</option>
                {especialidades?.sort((a, b) => 
                  a.descripcion.localeCompare(b.descripcion)
                ).map((esp) => (
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