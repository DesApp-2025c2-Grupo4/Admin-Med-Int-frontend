import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { ReporteAltaPorPeriodos } from "../../../components/ReporteAltaPorPeriodos/ReporteAltaPorPeriodos.jsx";
import "./Reporte.css"
import { listPrestador } from "../../../Mock/listPrestadores.js";


export function ReportePrestador(){
    useCambiarTitulo({title:"Reportes"});
    
    return (
        <div className="box-border">
            <TitleSection text="Reportes de Prestadores"/>
            <div className="reportes-contenedor">
                <ReporteAltaPorPeriodos data={listPrestador}/>
            </div>
        </div>
    )

};
