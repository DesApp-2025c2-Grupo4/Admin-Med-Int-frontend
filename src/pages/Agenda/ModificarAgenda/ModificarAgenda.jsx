import { useParams } from "react-router";
import { useGetDetalleAgenda } from "../../../hooks/useGetDetalleAgenda.jsx";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormModificarAgenda } from "./FormModificarAgenda/FormModificarAgenda.jsx";

export function ModificarAgenda() {
  const { id } = useParams();
  const { error, loadingAgenda, agenda } = useGetDetalleAgenda(id);

  return (
    <section className="section__modificar-agenda-container box-border">
      <TitleSection text="Modificar Agenda" />
      {loadingAgenda ? (
        <Loader />
      ) : error ? (
        <h2 className="message-error">{error}</h2>
      ) : (
        <FormModificarAgenda text="Agenda del prestador" initialData={agenda} />
      )}
    </section>
  );
}