import "./ReporteAltaPorPeriodos.css";
import { InputDate } from "../ui/Input/InputDate/InputDate.jsx";
import { useState } from "react";
import { ReporteContainer } from "../ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader.jsx";

export function ReporteAltaPorPeriodos({ onGenerarReporte }) {
  const [periodo, setPeriodo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPeriodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenerarReporte = async () => {
    const fechaDesde = periodo.fechaDesde;
    const fechaHasta = periodo.fechaHasta;
    setLoading(true);
    setError(null);
    try {
      const datosFiltrados = await onGenerarReporte(fechaDesde, fechaHasta);
      navigate("reporte-alta-generado", {
        state: {
          resultados: datosFiltrados,
          fechaDesde: fechaDesde,
          fechaHasta: fechaHasta,
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReporteContainer title="Reporte de alta por periodos">
      <div className="inputs-container">
        <InputDate
          text="Fecha desde"
          name="fechaDesde"
          value={periodo.fechaDesde || ""}
          handleChange={handleChange}
        />
        <InputDate
          text="Fecha hasta"
          name="fechaHasta"
          value={periodo.fechaHasta || ""}
          handleChange={handleChange}
        />
        {periodo.fechaDesde && periodo.fechaHasta && !loading && (
          <Button text="Generar reporte" onClick={handleGenerarReporte} />
        )}
        {loading && <Loader />} 
        {error && <p>Error: {error}</p>} 
      </div>
    </ReporteContainer>
  );
}
