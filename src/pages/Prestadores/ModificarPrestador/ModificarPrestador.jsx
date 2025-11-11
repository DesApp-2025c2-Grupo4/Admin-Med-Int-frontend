import { useParams } from "react-router";
import { useGetDetallePrestador } from "../../../hooks/useGetDetalleDePrestador";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormModificarPrestador } from "./FormModificarPrestador/FormModificarPrestador.jsx";
import { SubTitleSection } from '../../../components/ui/SubTitleSection/SubTitleSection.jsx';
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto.jsx';

export function ModificarPrestador() {
  const { id } = useParams();
  const { error, loadingPrestador, prestador } = useGetDetallePrestador(id);

  return (
    <section className="section__modificar-prestador-container box-border">
      <TitleSection text="Modificar Prestador" />
      {loadingPrestador ? (
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height:'20vh'}}>
          <LoaderConTexto text={'Cargando datos del formulario'} />
        </div>
      ) : error ? (
        <div className='error-message'>
          <SubTitleSection text={'No se pudo cargar los datos del formulario.'}/>
        </div>
      ) : (
        <FormModificarPrestador text="Datos del prestador" initialData={prestador} />
      )}
    </section>
  );
}