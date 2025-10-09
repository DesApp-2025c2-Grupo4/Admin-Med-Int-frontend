import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";

export function ReporteAltaGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const {resultados,fechaDesde,fechaHasta} = location.state
  console.log(location.state);

  const handleVolver = () => {
    navigate(-1);
  };

  const columnasAfiliados = [
    { titulo: "Credencial", field: "credencial" },
    { titulo: "Nombre", field: "nombre" },
    { titulo: "Apellido", field: "apellido" },
    { titulo: "Fecha Alta", field: "fechaAlta" }
  ];

  return (
    <>
      {resultados.length > 0 ? (
        <TablaResultados 
          datos={resultados}
          columnas={columnasAfiliados}
          keyField="personaId"
          titulo={`Resultados del Reporte de Afiliados dados de alta en el período desde: ${fechaDesde} hasta: ${fechaHasta} `} />
      ) : (
        <p>No hay resultados para mostrar.</p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}
