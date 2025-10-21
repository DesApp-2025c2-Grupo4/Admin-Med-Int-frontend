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
          campo={'nroTelefono'}
        />
        <CampoInformacionLista
          title={'Direcciones'}
          lista={prestador.direccion?.map(d => ({
            descripcion: `${d.calle} - ${d.nro ?? 'S/N'}, CP: ${d.codigoPostal}`
           }))}
          campo={'descripcion'}
        />
      </div>
      <div className="info-row">
        <CampoDeInformacion
          title={'Emails'}
          info={prestador.email?.map(e => e.descripcion).join(', ')}
        />
      </div>
    </section>
  )
}