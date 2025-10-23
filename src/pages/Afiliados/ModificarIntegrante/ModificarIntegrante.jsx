import { useParams } from "react-router";
import { useGetDetallePersona } from "../../../hooks/useGetDetalleDePersona";
import { Loader } from "../../../components/Loader/Loader";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { FormDatosPersonales } from './layouts/FormDatosPersonales/FormDatosPersonales.jsx';
import { useDataFormAfiliados } from '../../../hooks/Formularios/useDataFormAfiliados.jsx';
import './ModificarIntegrante.css'
import { SectionTelefono } from './layouts/SectionTelefonos/SectionTelefonos.jsx';
import { SectionEmails } from './layouts/SectionEmails/SectionEmails.jsx';
export function ModificarIntegrante() {
  const { id } = useParams();
  const { error, loadingPersona, persona,setPersona } = useGetDetallePersona(id);
  const {datosParaFormulario} = useDataFormAfiliados()
  console.log(persona)
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
      <section className="box-border" style={{marginBottom: '1rem'}}>
        <FormDatosPersonales 
          data={persona} 
          datosParaFormulario={datosParaFormulario} 
          id={id}
          setPersona={setPersona}
        />
      </section>
      <section 
        className='box-border section-modificar-integrante__hijo-container' 
        style={{padding: '1.5rem 1.5rem 1.5rem 1.5rem', marginBottom:'1rem'}}>
        <SectionTelefono 
          telefonosLista={persona.telefonos}
          personaId={id}
          setPersona={setPersona}
        />
      </section>
      <section 
        className='box-border section-modificar-integrante__hijo-container' 
        style={{padding: '1.5rem 1.5rem 1.5rem 1.5rem'}}>
        <SectionEmails 
          emails={persona.email}
          personaId={id}
          setPersona={setPersona}
          />
      </section>
    </>
    
  );
}
