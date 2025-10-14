import { SectionDetallesPersonales  } from "./SectionDetallesPersonales/SectionDetallesPersonales"
import { SectionDetallesContacto } from "./SectionDetallesContacto/SectionDetallesContacto"
import { SectionDetalleGrupo } from "./SectionDetallesGrupo/SectionDetalleGrupo"
import { ButtonEditar } from "./ui/ButtonEditar/ButtonEditar"
export function TodosLosDetalles({persona}){
  return(
    <>
      {/* Detalles personales */}
      <SectionDetallesPersonales persona={persona}/>
      {/* Detalles de grupo */}
      <SectionDetalleGrupo persona={persona}/>
      {/* Detalles de contacto */}
      <SectionDetallesContacto persona ={persona} /> 
      {/* <SectionDetallesDeGrupo persona = {persona} /> */}
      <ButtonEditar path={`/afiliados/gestionar/modificar/persona/${persona.personaId}`}/>
    </>
  )
}