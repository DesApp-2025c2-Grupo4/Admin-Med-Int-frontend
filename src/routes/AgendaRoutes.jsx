import { Route, Routes } from "react-router";
import { NuevaAgenda } from '../pages/Agenda/NuevaAgenda/NuevaAgenda'
import { GestionarAgenda} from '../pages/Agenda/GestionarAgenda/GestionarAgenda'
import { ModificarAgenda } from '../pages/Agenda/ModificarAgenda/ModificarAgenda'
import { DetallesAgenda } from "../pages/Agenda/DetalleAgenda/DetallesAgenda";

export function AgendaRoutes(){
  return(
    <Routes>
      <Route path='nueva-agenda' element={<NuevaAgenda />}/>
      <Route path='gestionar' element={<GestionarAgenda />}/>
      <Route path='modificar/:id' element={<ModificarAgenda />}/>
      <Route path='detalles/:id' element={<DetallesAgenda />}/>
      {/* Opcional: ruta por defecto */}
      <Route index element={<GestionarAgenda />} />
    </Routes>
  )
}