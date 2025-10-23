import { CampoDeInformacion } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/campoDeInformacion";
import { CampoInformacionLista } from "../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/CampoInformacionLista/CampoInforacionLista";

export function SectionProfesion({prestador}){

  const tipo = prestador.tipoPrestador?.toLowerCase() || '';

  let lugarDeTrabajo = 'No aplica';

  if (tipo.includes('independiente') && prestador.lugarIndependiente) {
    lugarDeTrabajo = prestador.lugarIndependiente;
  } else if (tipo.includes('centro') && prestador.lugarCentro) {
    lugarDeTrabajo = prestador.lugarCentro;
  }

  return(
    <section className="section__info-container">
      <h3 className="section__info-title">
        Información profesional
      </h3>
      <div className="info-row">
        <CampoDeInformacion
          title={'Tipo de Prestador'}
          info={prestador.tipoPrestador}
        />
        <CampoDeInformacion
          title={'Lugar de trabajo'}
          info={lugarDeTrabajo}
        />
      </div>
      <div className="info-row">
        <CampoInformacionLista 
          title={'Especialidad/es'}
          lista={prestador.especialidad}
          campo={'descripcion'}
        />
      </div>
    </section>
  )
}