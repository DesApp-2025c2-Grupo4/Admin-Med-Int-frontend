import './CampoDiaHorarioItem.css'
export const CampoDiaHorarioItem = ({ agendaDia }) => {
    return (
        <div className="dia-horario-item" >
           <h2 className='info__title' style={{ fontSize: '1rem' }}>{agendaDia.dia?.descripcion || 'Día no especificado'}  </h2> 
             <h2 className='info__title' style={{ fontSize: '0.95rem' }}>Horarios: </h2> 
            {agendaDia.horarios && agendaDia.horarios.length > 0 ? (
                <div className="horarios-list">
                    {agendaDia.horarios.map((h, index) => (
                        <p key={index} className="info__text" style={{ fontSize: '0.9rem' }}>
                            {`${h.horarioInicio} - ${h.horarioFinal} (Duración: ${h.duracionTurno} min)`}
                        </p>
                    ))}
                </div>
            ) : (
                <span>No hay horarios configurados</span>
            )}
        </div>
    );
};