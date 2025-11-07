import { TitleSection } from "../../../components/TitleSections/TitleSection"
import { NuevaAgendaForm } from "./NuevaAgendaForm/NuevaAgendaForm"
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo";

export function NuevaAgenda(){
  useCambiarTitulo({ title: "Nueva Agenda" });
  return (
    <>
    <section className="section__nuevo-grupo-familiar-container box-border">
      <TitleSection text="Nueva Agenda" />
      <NuevaAgendaForm />
    </section>
    </>
  )
}