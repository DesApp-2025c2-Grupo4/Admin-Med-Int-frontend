import { useParams } from "react-router";
import { useGetDetallePersona } from "../../../hooks/useGetDetalleDePersona";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormModificarIntegrante } from "./FormModificarIntegrante/FormModificarIntegrante.jsx";

export function ModificarIntegrante() {
  const { id } = useParams();
  const { error, loadingPersona, persona } = useGetDetallePersona(id);

  return (
    <section className="section__modificar-integrante-container box-border">
      <TitleSection text="Modificar Integrante" />
      {loadingPersona ? (
        <Loader />
      ) : error ? (
        <h2 className="message-error">{error}</h2>
      ) : (
        <FormModificarIntegrante text="Datos del integrante" initialData={persona} />
      )}
    </section>
  );
}
