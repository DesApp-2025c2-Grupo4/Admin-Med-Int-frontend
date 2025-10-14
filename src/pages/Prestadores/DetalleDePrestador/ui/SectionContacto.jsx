import { CampoDeInformacion } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/campoDeInformacion";
import { CampoInformacionLista } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/CampoInformacionLista/CampoInforacionLista";

export function SectionContacto({prestador}){
  return(
    <section className="section__info-container" style={{margin: '10px 0'}}>
      <h3 className="section__info-title">
        Información de contacto
      </h3>
      <div className="info-row">
        <CampoInformacionLista 
          title={'Telefonos'}
          lista={prestador.telefonos}
          campo={'nro'}
        />
        <CampoInformacionLista
          title={'Direcciones'}
          lista={prestador.direccion}
          campo={'direcciones'}
        />
      </div>
      <div className="info-row">
        <CampoDeInformacion
          title={'Email'}
          info={prestador.email}
        />
      </div>
    </section>
  )
}