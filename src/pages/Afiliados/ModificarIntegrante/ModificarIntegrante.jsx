import { useParams } from "react-router";
import { useGetDetallePersona } from "../../../hooks/useGetDetalleDePersona";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormDatosPersonales } from './ui/FormDatosPersonales/FormDatosPersonales.jsx';
import { useDataFormAfiliados } from '../../../hooks/Formularios/useDataFormAfiliados.jsx';
import './ModificarIntegrante.css'
export function ModificarIntegrante() {
  const { id } = useParams();
  const { error, loadingPersona, persona,setPersona } = useGetDetallePersona(id);
  const {datosParaFormulario} = useDataFormAfiliados()
  //En caso de estar cargando
  if(loadingPersona){
    return(
      <div className="contendor_loader-detalle">
        <Loader />
      </div>
    )
  }
  //En caso de error
  if(error){
    return(
      <h2 className="message-error">{error}</h2>
    )
  }
  return (
    <>
      <div style={{margin: '-1rem'}}>
        <TitleSection text={`Modificar ${persona.esTitular ? 'Afiliado' : 'Integrante'}: ${persona.nombre}, ${persona.apellido}`} />
      </div>
      <section className=" box-border" >
        <FormDatosPersonales 
          data={persona} 
          datosParaFormulario={datosParaFormulario} 
          id={id}
          setPersona={setPersona}
        />
      </section>
    </>
    
  );
}
