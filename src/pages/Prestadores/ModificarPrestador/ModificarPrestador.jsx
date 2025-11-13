import { useParams } from "react-router";
import { useGetDetallePrestador } from "../../../hooks/useGetDetalleDePrestador";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormModificarPrestador } from "./FormModificarPrestador/FormModificarPrestador.jsx";
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection.jsx";

export function ModificarPrestador() {
  const { id } = useParams();
  const { error, loadingPrestador, prestador } = useGetDetallePrestador(id);

  return (
    <section className="section__modificar-prestador-container box-border">
      <TitleSection text="Modificar Prestador" />
      {loadingPrestador ? (
        <div className="centrar">
          <Loader />
        </div>
      ) : error ? (
        <div className="centrar">
          <SubTitleSection text="No se ha podido cargar el formulario" className="centrar" />
        </div>
        
      ) : (
        <FormModificarPrestador text="Datos del prestador" initialData={prestador} />
      )}
    </section>
  );
}