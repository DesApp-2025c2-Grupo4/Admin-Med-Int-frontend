import { useParams } from "react-router";
import { useGetDetallePrestador } from "../../../hooks/useGetDetalleDePrestador";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormModificarPrestador } from "./FormModificarPrestador/FormModificarPrestador.jsx";

export function ModificarPrestador() {
  const { id } = useParams();
  const { error, loadingPrestador, prestador } = useGetDetallePrestador(id);

  return (
    <section className="section__modificar-prestador-container box-border">
      <TitleSection text="Modificar Prestador" />
      {loadingPrestador ? (
        <Loader />
      ) : error ? (
        <h2 className="message-error">{error}</h2>
      ) : (
        <FormModificarPrestador text="Datos del prestador" initialData={prestador} />
      )}
    </section>
  );
}