import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { ReporteAltaPorPeriodos } from "../../../components/ReporteAltaPorPeriodos/ReporteAltaPorPeriodos.jsx";
import "./Reporte.css"
// import { listPrestador } from "../../../Mock/listPrestadores.js";
import { useGetAllPrestadores } from "../../../hooks/useGetAllPrestadores.jsx";
import { useState, useEffect } from "react";

export function ReportePrestador(){
      const { /*loadingPrestadores,*/ prestadores } = useGetAllPrestadores();
      const [allPrestadores, setAllPrestadores] = useState([]);
    
    useCambiarTitulo({title:"Reportes"});

    useEffect(() => {
        if (prestadores) {
          setAllPrestadores(prestadores);
        }
      }, [prestadores]);

    return (
        <div className="box-border">
            <TitleSection text="Reportes de Prestadores"/>
            <div className="reportes-contenedor">
                <ReporteAltaPorPeriodos data={allPrestadores}/>
            </div>
        </div>
    )

};
