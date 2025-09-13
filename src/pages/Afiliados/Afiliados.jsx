import { TitlePrincipal } from '../../components/TitlePrincipal/TitlePrincipal'
import { SubTitlePrincipal} from '../../components/SubTitlePrincipal/SubTitlePrincipal'
import { NavMain } from '../../components/NavMain/NavMain'
import { navAfiliadosItems } from '../../constants/navAfiliadosItems'
import { AfiliadoRoutes } from '../../routes/AfiliadosRoutes'
export function Afiliados(){
  return(
    <>  
      {/* Encabezado de mi aplicacion */}
      <TitlePrincipal text='Afiliados'/>
      <SubTitlePrincipal text='Administración de afiliados y grupos familiares' />

      {/* Sub-navegacion de mi main */}
      <NavMain listItems={navAfiliadosItems}/>

      {/* Rutas donde voy a renderizar las diferentes secciones mi aplicacion */}
      <AfiliadoRoutes />
    </>
  )
}