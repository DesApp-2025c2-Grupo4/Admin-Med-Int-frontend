import { TitlePrincipal } from '../../components/TitlePrincipal/TitlePrincipal'
import { SubTitlePrincipal } from '../../components/SubTitlePrincipal/SubTitlePrincipal'
export function Dashboard(){
  return(
    <>
      <TitlePrincipal text='Dashboard'/>
      <SubTitlePrincipal text='Resumen del estado actual del sistema de medicina integral' />
    </>
  )
}