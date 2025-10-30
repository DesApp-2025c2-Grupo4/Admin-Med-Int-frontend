import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { ReporteAltaPorPeriodos } from "../../../components/ReporteAltaPorPeriodos/ReporteAltaPorPeriodos.jsx";
import { ReporteSituacionesTerapeuticas } from "./ReporteSituacionesTerapeuticas/ReporteSituacionesTerapeuticas.jsx";
import "./Reporte.css";
import { getAfiliadosPorPeriodo } from "../../../services/afiliados/getAfiliadosPorPeriodo.js"

export function Reporte() {
  useCambiarTitulo({ title: "Reportes" });

  const handleGenerarReporte = async (fechaDesde, fechaHasta) => {
    return await getAfiliadosPorPeriodo(fechaDesde, fechaHasta);
  };

  return (
    <div className="box-border">
      <TitleSection text="Reportes de afiliados" />
      <div className="reportes-contenedor">
        <ReporteSituacionesTerapeuticas />
        <ReporteAltaPorPeriodos onGenerarReporte={handleGenerarReporte} />
      </div>
    </div>
  );
}
