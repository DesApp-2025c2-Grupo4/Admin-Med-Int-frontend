import { Route, Routes } from "react-router";
import { GestionarPrestadores } from '../pages/Prestadores/Gestionar/GestionarPrestadores.jsx'
import { NuevoPrestador } from '../pages/Prestadores/NuevoPrestador/NuevoPrestador.jsx'
import { ReportePrestador } from '../pages/Prestadores/Reporte/ReportePrestador.jsx'
import { ModificarPrestador } from '../pages/Prestadores/ModificarPrestador/ModificarPrestador.jsx'
import { ReporteAltaGenerado } from "../pages/Prestadores/Reporte/ReporteAltaGenerado/ReporteAltaGenerado.jsx"
import { DetalleDePrestador } from './../pages/Prestadores/DetalleDePrestador/DetalleDePrestador.jsx';
import { ReportePorEspecialidadGenerado } from "../pages/Prestadores/Reporte/ReportePorEspecialidad/ReportePorEspecialidadGenerado/ReportePorEspecialidadGenerado.jsx";

export function PrestadoresRoutes() {
  return (
    <Routes>
      <Route path="gestionar" element={<GestionarPrestadores />} />
      <Route path="nuevo-prestador" element={<NuevoPrestador />} />
      <Route path="reportes" element={<ReportePrestador />} />
      <Route path="modificar-prestador/:id" element={<ModificarPrestador />} />
      <Route path="reportes/reporte-alta-generado" element={<ReporteAltaGenerado />} />
      <Route path="reportes/reporte-cantidad-por-especialidad-generado" element={<ReportePorEspecialidadGenerado/>} />
      <Route path="gestionar/detalle/:id" element={<DetalleDePrestador />} />
      {/* Opcional: ruta por defecto */}
      <Route path="*" element={<GestionarPrestadores />} />
    </Routes>
  );
}
