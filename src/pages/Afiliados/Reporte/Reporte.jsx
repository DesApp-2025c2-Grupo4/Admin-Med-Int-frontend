import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { ReporteAltaPorPeriodos } from "./ReporteAltaPorPeriodos/ReporteAltaPorPeriodos.jsx";
import { ReporteSituacionesTerapeuticas } from "./ReporteSituacionesTerapeuticas/ReporteSituacionesTerapeuticas.jsx";
import "./Reporte.css"

export function Reporte (){
  
    useCambiarTitulo({title:"Reportes"});
    
    return (
        <div className="box-border">
            <TitleSection text="Reportes de afiliados"/>
            <div className="reportes-contenedor">
                <ReporteSituacionesTerapeuticas/>
                <ReporteAltaPorPeriodos/>
            </div>
        </div>
    )

};
