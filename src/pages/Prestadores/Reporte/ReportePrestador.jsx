import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { ReporteAltaPorPeriodos } from "../../../components/ReporteAltaPorPeriodos/ReporteAltaPorPeriodos.jsx";
import "./Reporte.css";
import { getPrestadoresPorPeriodo } from "../../../services/prestadores/getPrestadoresPorPeriodo.js"
import { ReportePorEspecialidad } from "./ReportePorEspecialidad/ReportePorEspecialidad.jsx";
import { ReportePorCodigoPostal } from "./ReportePorCodigoPostal/ReportePorCodigoPostal.jsx";


export function ReportePrestador() {
  useCambiarTitulo({ title: "Reportes" });

  const handleGenerarReporte = async (fechaDesde, fechaHasta) => {
      return await getPrestadoresPorPeriodo(fechaDesde, fechaHasta);
    };

  return (
    <div className="box-border">
      <TitleSection text="Reportes de Prestadores" />
      <div className="reportes-contenedor">
        <ReporteAltaPorPeriodos onGenerarReporte={handleGenerarReporte} />
        <ReportePorEspecialidad/>
        <ReportePorCodigoPostal/>
      </div>
    </div>
  );
}
