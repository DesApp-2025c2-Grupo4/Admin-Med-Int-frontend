import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Afiliados} from '../pages/Afiliados/Afiliados'
import { Prestadores} from '../pages/Prestadores/Prestadores'
import { Agenda } from '../pages/Agenda/Agenda'
import { Route } from 'react-router'
import { Routes,Navigate } from 'react-router'
export function NavBarRoutes(){
  return(
    <Routes >
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/afiliados/*' element={<Afiliados />}/>
      <Route path='/prestadores/*' element={<Prestadores />}/>
      <Route path='/agenda/*' element={<Agenda />}/>

      {/* Ruta Raiz cuando ingreso a afiliados */}
      <Route path='/afiliados' element={<Navigate to={'/afiliados/gestionar'}/>}/>
      {/* Ruta Raiz cuando ingreso a prestadores */}
      <Route path='/prestadores' element={<Navigate to={'/prestadores/gestionar'}/>}/>

      {/* Ruta Raiz cuando ingreso a prestadores */}
      <Route path='/agenda' element={<Navigate to={'/agenda/gestionar'}/>}/>
      
      {/* Ruta raíz -> Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      {/* Catch-all -> Dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}