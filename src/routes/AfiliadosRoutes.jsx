import { Route, Routes } from "react-router";
import { GestionarAfiliados } from "../pages/Afiliados/Gestionar/GestionarAfiliados.jsx";
import { NuevoGrupoFamiliar } from "../pages/Afiliados/Nuevo/NuevoGrupoFamilia.jsx";
import { Reporte } from "../pages/Afiliados/Reporte/Reporte.jsx";
import { AgregarIntegrante } from "../pages/Afiliados/AgregarIntegrante/AgregarIntegrante.jsx";

export function AfiliadoRoutes(){
    return(
        <Routes>
            <Route path="gestionar" element={<GestionarAfiliados />} />
            <Route path="nuevo-grupo-familiar" element={<NuevoGrupoFamiliar />}/>
            <Route path="reportes" element={<Reporte />}/>
            <Route path="agregar-integrante" element={<AgregarIntegrante />} />
            {/* Opcional: ruta por defecto */}
            <Route index element={<GestionarAfiliados />} />
        </Routes>
    )
}