import { Route, Routes } from "react-router";
import { GestionarAfiliados } from "../pages/Afiliados/Gestionar/GestionarAfiliados.jsx";
import { NuevoGrupoFamiliar } from "../pages/Afiliados/Nuevo/NuevoGrupoFamilia.jsx";
import { Reporte } from "../pages/Afiliados/Reporte/Reporte.jsx";
import { AgregarIntegrante } from "../pages/Afiliados/AgregarIntegrante/AgregarIntegrante.jsx";
import { DetalleDePersona } from "../pages/Afiliados/DetalleDePersona/DetalleDePersona.jsx";
import { ModificarIntegrante } from "../pages/Afiliados/ModificarIntegrante/ModificarIntegrante.jsx";
export function AfiliadoRoutes(){
    return(
        <Routes>
            <Route path="gestionar" element={<GestionarAfiliados />} />
            <Route path="nuevo-grupo-familiar" element={<NuevoGrupoFamiliar />}/>
            <Route path="reportes" element={<Reporte />}/>
            <Route path="agregar-integrante" element={<AgregarIntegrante />} />
            <Route path="gestionar/detalles/persona/:id" element={<DetalleDePersona />} />
            <Route path="gestionar/modificar/persona/:id" element={<ModificarIntegrante />} />
            {/* Opcional: ruta por defecto */}
            <Route index element={<GestionarAfiliados />} />
        </Routes>
    )
}