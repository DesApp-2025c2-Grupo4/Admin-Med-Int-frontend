import { TitleSection } from "../../../components/TitleSections/TitleSection"
import { NuevaAgendaForm } from "./NuevaAgendaForm/NuevaAgendaForm"
export function NuevaAgenda(){
  return (
    <>
    <section className="section__nuevo-grupo-familiar-container box-border">
      <TitleSection text="Nuevo Grupo Familiar" />
      <NuevaAgendaForm />
    </section>
    </>
  )
}