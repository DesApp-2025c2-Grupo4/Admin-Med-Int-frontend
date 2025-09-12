import { TitlePrincipal } from '../../components/TitlePrincipal/TitlePrincipal'
import { SubTitlePrincipal} from '../../components/SubTitlePrincipal/SubTitlePrincipal'
import { NavMain } from '../../components/NavMain/NavMain'
import { navAfiliadosItems } from '../../constants/navAfiliadosItems'
import { AfiliadoRoutes } from '../../routes/AfiliadosRoutes'
export function Afiliados(){
  return(
    <>
      <TitlePrincipal text='Afiliados'/>
      <SubTitlePrincipal text='Administración de afiliados y grupos familiares' />
      <NavMain listItems={navAfiliadosItems}/>
      <AfiliadoRoutes />
    </>
  )
}