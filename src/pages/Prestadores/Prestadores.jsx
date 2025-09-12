import { TitlePrincipal } from "../../components/TitlePrincipal/TitlePrincipal"
import { SubTitlePrincipal } from "../../components/SubTitlePrincipal/SubTitlePrincipal"
import { NavMain } from "../../components/NavMain/NavMain"
import { navPrestadoresItems } from "../../constants/navPrestadoresItems"
export function Prestadores(){
  return(
    <>
      <TitlePrincipal text='Prestadores'/>
      <SubTitlePrincipal text='Administración de médicos, centros médicos' />
      <NavMain listItems={navPrestadoresItems}/>
    </>   
  )
}