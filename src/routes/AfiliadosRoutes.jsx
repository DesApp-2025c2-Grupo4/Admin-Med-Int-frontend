import { Route, Routes } from "react-router";
import { GestionarAfiliados } from "../pages/Afiliados/Gestionar/GestionarAfiliados";
import { NuevoGrupoFamiliar } from "../pages/Afiliados/Nuevo/NuevoGrupoFamilia";
import { Reporte } from "../pages/Afiliados/Reporte/Reporte";

export function AfiliadoRoutes(){
    return(
        <Routes>
            <Route path="/gestionar" element={<GestionarAfiliados />} />
            <Route path="/nuevo-grupo-familiar" element={<NuevoGrupoFamiliar />}/>
            <Route path="/reportes" element={<Reporte />}/>
        </Routes>
    )
}