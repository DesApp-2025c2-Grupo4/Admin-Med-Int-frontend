import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../pages/Afiliados/Reporte/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../pages/Afiliados/Reporte/ui/TablaResultados/TablaResultados.jsx";

export function ReporteAltaGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const {resultados,fechaDesde,fechaHasta} = location.state
  console.log(location.state);

  const handleVolver = () => {
    navigate(-1);
  };

  const columnasAfiliados = [
    { titulo: "Nombre", field: "nombre" },
    { titulo: "Cuil/Cuit", field: "cuilCuit" },
    { titulo: "Tipo de prestador", field: "tipoPrestador" },
    { titulo: "Fecha Alta", field: "fechaAlta" }
  ];

  return (
    <>
      {resultados.length > 0 ? (
        <TablaResultados 
          datos={resultados}
          columnas={columnasAfiliados}
          keyField="prestadorId"
          titulo={`Resultados del Reporte de Prestadores dados de alta en el período desde: ${fechaDesde} hasta: ${fechaHasta} `} />
      ) : (
        <p>No hay resultados para mostrar.</p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}
