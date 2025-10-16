import { NavMain } from "../../components/NavMain/NavMain";
import { SubTitlePrincipal } from "../../components/SubTitlePrincipal/SubTitlePrincipal";
import { TitlePrincipal } from "../../components/TitlePrincipal/TitlePrincipal";
import { navAgendaItems } from "../../constants/navAgendaItems";
import { AgendaRoutes } from "../../routes/AgendaRoutes";

export function Agenda(){
  return(
    <div className='div__main-principal'>
      {/* Encabezado de la pagina*/}
      <TitlePrincipal text='Agendas' />
      <SubTitlePrincipal text='Administrador de agendas de turnos médicos por prestador y especialidad' />

      {/* Barra de navegacion interna */}
      <NavMain listItems={navAgendaItems}/>

      {/* Rutas donde se renderiza el contenido */}
      <AgendaRoutes />
    </div>
  )
}