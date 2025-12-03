import { CampoDeInformacion } from "../../../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/campoDeInformacion"
import { CampoDiaHorarioItem } from "../CampoDiaHorarioItem/CampoDiaHorarioItem"
export function SectionDetalleAgenda({agenda}){
    return(
        <section className='section__info-container' style={{margin: '1rem 0'}}>
            <h3 className='section__info-title'>Informacion de Prestador</h3>
            <div className="info-row">
                <CampoDeInformacion 
                  title={'Nombre'}
                  info={agenda.prestador.nombre}
                />
                <CampoDeInformacion 
                  title={'Apellido'}
                  info={agenda.prestador.apellido}
                />
            </div>
            <div className="info-row">
                <CampoDeInformacion 
                  title={'CUIT/CUIL'}
                  info={agenda.prestador.cuilCuit}
                />
                <CampoDeInformacion 
                  title={'Tipo de prestador'}
                  info={agenda.prestador.tipoPrestador}
                />
            </div>
            <div className="info-row">
                <CampoDeInformacion 
                  title={'Lugar asociado'}
                  info={agenda.prestador.asociadoDe || 'No aplica'}
                />
                <CampoDeInformacion 
                  title={'Tipo de prestador'}
                  info={agenda.prestador.fechaAlta}
                />
            </div>
            <h3 className='section__info-title'>Informacion de Agenda</h3>
            <div className="info-row">
                <CampoDeInformacion 
                  title={'Especialidad'}
                  info={agenda.especialidad.descripcion}
                />
                <CampoDeInformacion 
                  title={'Lugar de atención'}
                  info={`${agenda.direccion?.calle || ''} ${agenda.direccion?.nro || ''} - CP: ${agenda.direccion?.codigoPostal || ''}`}
                />
            </div>
            <div className="info-horarios-agenda">
                <h3 className='section__info-title'>Horarios</h3>
                <div className="horarios-list-container">
                {agenda.agendas && agenda.agendas.length > 0 ? (
                    agenda.agendas.map((agendaDia) => (
                        <CampoDiaHorarioItem 
                            key={agendaDia.agendaDiaId}
                            agendaDia={agendaDia}
                        />
                    ))
                ) : (
                    <p>No hay días y horarios configurados.</p>
                )}
                </div>
            </div>
        </section>
    )
}