import './SectionDetallesContacto.css'
import { CampoInformacionLista } from '../ui/CampoInformacionLista/CampoInforacionLista'
export function SectionDetallesContacto({persona}){
  return(
    <section className='section__info-container' style={{margin: '1rem 0'}}>
      <h3 className='section__info-title'>Informacion de Contacto</h3>
      <div className="info-row ">
        <CampoInformacionLista 
          title='Telefono/s'
          lista={persona.telefonos}
          campo={'nroTelefono'}
        />
        <CampoInformacionLista 
          title='Direccion/es'
          lista={persona.direcciones}
          campo={'direcciones'}
        />
      </div>
      <div className="info-row" style={{margin: '1rem 0'}}>
        <CampoInformacionLista
          title={'Email/s'}
          lista={persona.email}
          campo={'descripcion'}
        />
      </div>
    </section>
  )
}