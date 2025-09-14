import { Route, Routes } from "react-router";
import { NuevaAgenda } from '../pages/Agenda/NuevaAgenda/NuevaAgenda'
import { GestionarAgenda} from '../pages/Agenda/GestionarAgenda/GestionarAgenda'
export function AgendaRoutes(){
  return(
    <Routes>
      <Route path='nueva-agenda' element={<NuevaAgenda />}/>
      <Route path='gestionar' element={<GestionarAgenda />}/>

      {/* Opcional: ruta por defecto */}
      <Route index element={<GestionarAgenda />} />
    </Routes>
  )
}