import { useParams } from "react-router-dom";
import { useGetDetalleAgenda } from "../../../hooks/useGetDetalleAgenda.jsx";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { ModificarAgendaForm } from "./ModificarAgendaForm/ModificarAgendaForm.jsx";
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection.jsx";

export function ModificarAgenda() {
  const { id } = useParams();
  const { error, loadingAgenda, agenda } = useGetDetalleAgenda(id);

  return (
    <section className="section__modificar-agenda-container box-border">
      <TitleSection text="Modificar Agenda" />
      {loadingAgenda ? (
        <div className="centrar">
          <Loader />
        </div>
      ) : error ? (
        <div className="centrar">
          <SubTitleSection text=" No se pudo cargar el formulario. "></SubTitleSection>
        </div>
      ) : (
        <ModificarAgendaForm initialData={agenda} />
      )}
    </section>
  );
}
