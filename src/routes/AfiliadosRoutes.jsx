import { Route, Routes } from "react-router";
import { GestionarAfiliados } from "../pages/Afiliados/Gestionar/GestionarAfiliados.jsx";
import { NuevoGrupoFamiliar } from "../pages/Afiliados/Nuevo/NuevoGrupoFamilia.jsx";
import { Reporte } from "../pages/Afiliados/Reporte/Reporte.jsx";
import { AgregarIntegrante } from "../pages/Afiliados/AgregarIntegrante/AgregarIntegrante.jsx";
import { DetalleDePersona } from "../pages/Afiliados/DetalleDePersona/DetalleDePersona.jsx";
import { ModificarGrupo } from "../pages/Afiliados/ModificarGrupo/ModificarGrupo.jsx";

export function AfiliadoRoutes(){
    return (
      <Routes>
        <Route path="gestionar" element={<GestionarAfiliados />} />
        <Route path="gestionar/modificar-grupo-familiar/:id" element={<ModificarGrupo />}/>
        <Route path="nuevo-grupo-familiar" element={<NuevoGrupoFamiliar />} />
        <Route path="reportes" element={<Reporte />} />
        <Route path="agregar-integrante" element={<AgregarIntegrante />} />
        <Route path="gestionar/detalles/persona/:id" element={<DetalleDePersona />}/>
        {/* Opcional: ruta por defecto */}
        <Route index element={<GestionarAfiliados />} />
      </Routes>
    );
}