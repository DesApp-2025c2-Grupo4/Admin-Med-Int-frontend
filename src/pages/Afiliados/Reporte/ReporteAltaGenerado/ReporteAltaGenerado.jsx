import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { headerTablaResultadosAltaPeriodo } from "../../../../constants/Afiliados/Reportes/headerTablaResultadosAltaPeriodo.js";

export function ReporteAltaGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const {resultados,fechaDesde,fechaHasta} = location.state
  console.log(location.state);

  const handleVolver = () => {
    navigate(-1);
  };
  
  return (
    <>
      {resultados.length > 0 ? (
        <TablaResultados 
          datos={resultados}
          columnas={headerTablaResultadosAltaPeriodo}
          keyField="personaId"
          titulo={`Resultados del Reporte de Afiliados dados de alta en el período desde: ${fechaDesde} hasta: ${fechaHasta} `} />
      ) : (
        <p>No hay resultados para mostrar.</p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}
