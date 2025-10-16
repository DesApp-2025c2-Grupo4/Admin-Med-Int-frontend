import { useLocation, useNavigate } from "react-router";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { headerTablaResultadosSituaciones } from "../../../../../constants/Afiliados/Reportes/headerTablaResultadosSituaciones.js";

export function ReporteSituacionesGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const integrante = location.state?.integrante || [];
  const situaciones = integrante.situacionesTerapeuticas || [];
  console.log(location.state);

  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <>
    {situaciones.length > 0 ? (
        <TablaResultados
            datos={situaciones}
            columnas={headerTablaResultadosSituaciones}
            keyField="personaId"
            titulo={`Resultados del Reporte de situaciones terapéuticas de ${integrante.nombre} ${integrante.apellido}`}
        />
        ) : (
            <p>El integrante: {integrante.nombre} {integrante.apellido} no tiene situaciones terapéuticas actualmente.</p>            
            )
        }
      <Button text="Volver" onClick={handleVolver} />
    </>
  )
}
