import './SectionDetallesPersonales.css'
import { CampoDeInformacion } from '../ui/campoDeInformacion'
import { CampoInformacionLista } from '../ui/CampoInformacionLista/CampoInforacionLista'
export function SectionDetallesPersonales({persona}){
  return(
    <section className='section__info-container'>
      <h3 className='section__info-title'>
        Informacion Personal</h3>
      <div className="info-row">
        <CampoDeInformacion 
          title='Nombre y apellido'
          info={`${persona.nombre}, ${persona.apellido}`}
        />
        <CampoDeInformacion
          title={persona.tipoDocumento.descripcion}
          info={persona.dni}
        />
      </div>
      <div className="info-row">
        <CampoDeInformacion 
          title={'Fecha de Nacimiento'}
          info={persona.fechaNacimiento}
        />
        <CampoDeInformacion
          title='Credencial'
          info={persona.credencial}
        />
      </div>
      <div className="info-row">
        <CampoDeInformacion
          title={'Fecha de Alta'}
          info={persona.fechaAlta}
        />
        <CampoDeInformacion
          title={'Parentesco'}
          info={persona.esTitular ? 'Titular' : persona.parentesco}
        />
      </div>
      <div className="info-row">
      {
        persona.situacionesTerapeuticas.length > 0 &&
              <CampoInformacionLista 
        lista={persona.situacionesTerapeuticas}
        title={'Situaciones Terapeuticas'}
        campo={'situaciones'}
      />
      }
      </div>


    </section>
  )
}