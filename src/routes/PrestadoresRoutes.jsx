import { Route, Routes } from "react-router";
import { GestionarPrestadores } from '../pages/Prestadores/Gestionar/GestionarPrestadores.jsx'
import { NuevoPrestador } from '../pages/Prestadores/NuevoPrestador/NuevoPrestador.jsx'
import { ReportePrestador } from '../pages/Prestadores/Reporte/ReportePrestador.jsx'
import { ModificarPrestador } from '../pages/Prestadores/ModificarPrestador/ModificarPrestador.jsx'

export function PrestadoresRoutes(){
  return(
    <Routes>
      <Route path="gestionar" element={<GestionarPrestadores />} />
      <Route path="nuevo-prestador" element={<NuevoPrestador />} />
      <Route path="reportes" element={<ReportePrestador />} />
      <Route path="modificar-prestador/:id" element={<ModificarPrestador />} />
      
      {/* Opcional: ruta por defecto */}
      <Route index element={<GestionarPrestadores />} />
    </Routes>
  )
}