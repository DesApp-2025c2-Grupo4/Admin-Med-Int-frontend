
import { useState } from "react";
import { ReporteContainer } from "../../../../components/ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../../../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

export function ReportePrestadoresSinAgenda() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerarReporte = async () => {
    setLoading(true);
    try {
      navigate("reporte-prestadores-sin-agenda-generado");
    } catch (err) {
      console.error("Error al generar reporte:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReporteContainer title="Reporte de prestadores sin agenda">
      <div className="inputs-container">
        
        <p>Este reporte muestra todos los prestadores que no tienen una agenda asignada</p>

        {!loading && (
          <Button text="Generar reporte" onClick={handleGenerarReporte} />
        )}
        
      </div>
    </ReporteContainer>
  );
}