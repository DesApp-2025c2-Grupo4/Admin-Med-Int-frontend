import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Afiliados} from '../pages/Afiliados/Afiliados'
import { Prestadores} from '../pages/Prestadores/Prestadores'
import { Agenda } from '../pages/Agenda/Agenda'
import { Route } from 'react-router'
import { Routes } from 'react-router'
export function NavBarRoutes(){
  return(
    <Routes >
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/afiliados' element={<Afiliados />}/>
        <Route path='/prestadores' element={<Prestadores />}/>
        <Route path='/agenda' element={<Agenda />}/>
        <Route path='*' element={<Dashboard />} />
      </Routes>
  )
}