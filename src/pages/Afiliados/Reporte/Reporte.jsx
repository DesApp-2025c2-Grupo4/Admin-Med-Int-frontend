import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { ReporteAltaPorPeriodos } from "../../../components/ReporteAltaPorPeriodos/ReporteAltaPorPeriodos.jsx";
import { ReporteSituacionesTerapeuticas } from "./ReporteSituacionesTerapeuticas/ReporteSituacionesTerapeuticas.jsx";
import "./Reporte.css";
import { useGetAllAfiliados } from "../../../hooks/Afiliados/useGetAllAfiliados.jsx";
// import { useState } from "react";
import { Loader } from "../../../components/Loader/Loader.jsx";

export function Reporte() {
  const { loadingAfiliados, afiliados } = useGetAllAfiliados();
//   const [allAfiliados, setAllAfiliados] = useState([]);

  useCambiarTitulo({ title: "Reportes" });
  
  return (
    <div className="box-border">
      <TitleSection text="Reportes de afiliados" />
      <div className="reportes-contenedor">
        <ReporteSituacionesTerapeuticas />
        <ReporteAltaPorPeriodos data={afiliados} />
      </div>
    </div>
  );
}
