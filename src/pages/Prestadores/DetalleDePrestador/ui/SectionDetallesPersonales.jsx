import { CampoDeInformacion } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/campoDeInformacion";

export function SectionDetallesPresonales({prestador}){
  return(
    <section className="section__info-container">
      <h3 className="section__info-title">Informacion Personal</h3>
      
      <div className="info-row">
        <CampoDeInformacion 
          title={'Identificador'}
          info={prestador.prestadorId}
        />
        <CampoDeInformacion 
          title={'Nombre y apellido'}
          info={`${prestador.nombre}, ${prestador.apellido}`}
        />
        
      </div>
      <div className="info-row">
        <CampoDeInformacion
          title={'CUIL/CUIT'}
          info={prestador.cuilCuit}
        />
        <CampoDeInformacion
          title={'Fecha de Alta'}
          info={prestador.fechaAlta}
        />
        
      </div>
    </section>
  )
}