import { CampoDeInformacion } from '../ui/campoDeInformacion'
import './SectionDetalleGrupo.css'
export function SectionDetalleGrupo({persona}){
  return(
    <section className='section__info-container' style={{margin: '1rem 0'}}>
      <h3 className='section__info-title'>Informacion de Grupo</h3>
      <div className="info-row">
        <CampoDeInformacion 
          title={'Nro Grupo'}
          info={persona.nroGrupo}
        />
        <CampoDeInformacion 
          title={'Plan'}
          info={persona.planMedico.descripcion}
        />
      </div>
    </section>
  )
}