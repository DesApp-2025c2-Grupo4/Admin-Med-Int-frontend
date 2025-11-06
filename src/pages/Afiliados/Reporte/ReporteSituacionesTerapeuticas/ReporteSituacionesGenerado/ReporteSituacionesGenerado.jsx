import { useLocation, useNavigate } from "react-router";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { headerTablaResultadosSituaciones } from "../../../../../constants/Afiliados/Reportes/headerTablaResultadosSituaciones.js"; // Cambia el import

export function ReporteSituacionesGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const integrante = location.state?.integrante;
  const integrantes = location.state?.integrantes;
  const nroGrupo = location.state?.nroGrupo;
  console.log(location.state);

  let situaciones = [];
  let titulo = "";
  let mensajeSinSituaciones = "";

  if (integrante) {
    // Caso individual
    situaciones = integrante.situacionesTerapeuticas || [];
    titulo = `Resultados del Reporte de situaciones terapéuticas de ${integrante.nombre} ${integrante.apellido}`;
    mensajeSinSituaciones = `El integrante: ${integrante.nombre} ${integrante.apellido} no tiene situaciones terapéuticas actualmente.`;
  } else if (integrantes) {
    // Caso de todos los integrantes
    integrantes.forEach((int) => {
      (int.situacionesTerapeuticas || []).forEach((sit) => {
        situaciones.push({
          ...sit,
          nombreIntegrante: `${int.nombre} ${int.apellido}`,
          idUnico: `${int.personaId}-${sit.situacionId}`
        });
      });
    });
    titulo = `Resultados del Reporte de situaciones terapéuticas para todos los integrantes del grupo ${nroGrupo}`;
    mensajeSinSituaciones = `Ningún integrante del grupo ${nroGrupo} tiene situaciones terapéuticas actualmente.`;
  }

  // Genera las columnas
  const columnas = headerTablaResultadosSituaciones(!!integrantes); // true si hay 'integrantes', false si hay 'integrante'
  const keyField = integrantes ? "idUnico" : "situacionId";

  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <>
      {situaciones.length > 0 ? (
        <TablaResultados
          datos={situaciones}
          columnas={columnas} 
          keyField={keyField}
          titulo={titulo}
        />
      ) : (
        <p>{mensajeSinSituaciones}</p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}