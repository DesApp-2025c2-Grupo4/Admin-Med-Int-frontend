import React, { useState, useMemo, useEffect } from 'react';
import { InputSelect } from '../../../../components/ui/Input/InputSelect/InputSelect.jsx';
import { DIAS_SEMANA } from '../../../../constants/listDias.js'; 
import { useGetPrestadoresNuevaAgenda } from '../../../../hooks/useGetPrestadoresNuevaAgenda.jsx'; 
import './NuevaAgendaForm.css'; 
import { SubTitleSection } from '../../../../components/ui/SubTitleSection/SubTitleSection.jsx';
import { AddButton } from '../../../../components/ui/AddButton/AddButton.jsx';
import { SaveAgenda } from '../../../../components/ui/SaveAgenda/SaveAgenda.jsx';

const initialHorario = {
    horaInicio: '06:00', 
    horaFin: '13:00',
    duracion: '30',
};

const initialAgendaHorarios = DIAS_SEMANA.reduce((acc, dia) => {
    acc[dia.id] = [];
    return acc;
}, {});

export function NuevaAgendaForm() {
    const { dataOptions, isLoading, error } = useGetPrestadoresNuevaAgenda();

    const [config, setConfig] = useState({
        prestador: '',
        especialidad: '', 
        lugarAtencion: '',
    });

    const [diaSeleccionado, setDiaSeleccionado] = useState(DIAS_SEMANA[0].id); 
    const [agendaHorarios, setAgendaHorarios] = useState(initialAgendaHorarios);

    const [nuevoHorario, setNuevoHorario] = useState(initialHorario);

    const especialidadesFiltradas = useMemo(() => {
        const selectedPrestadorId = config.prestador;
        const rawList = dataOptions.rawList;
        if (!selectedPrestadorId || rawList.length === 0) {
            return dataOptions.ESPECIALIDADES;
        }
        const prestador = rawList.find(p => p.prestadorId === Number(selectedPrestadorId)); 
        if (prestador && prestador.especialidad && prestador.especialidad.length > 0) {
            return prestador.especialidad.map(e => ({
                id: e.idEspecialidad,
                descripcion: e.descripcion
            }));
        }
        return []; 
    }, [config.prestador, dataOptions.rawList, dataOptions.ESPECIALIDADES]);

    const lugaresFiltrados = useMemo(() => {
        const selectedPrestadorId = config.prestador;
        const rawList = dataOptions.rawList;

        if (!selectedPrestadorId || rawList.length === 0) {
             return [];
        }

        const prestador = rawList.find(p => p.prestadorId === Number(selectedPrestadorId)); 

        if (prestador && prestador.direccion && prestador.direccion.length > 0) {
            return prestador.direccion.map(d => ({
                id: d.idDireccion,
                descripcion: `${d.calle} ${d.nro}` 
            }));
        }
        
        return [];
    }, [config.prestador, dataOptions.rawList]);

    useEffect(() => {
        if (config.prestador && especialidadesFiltradas.length > 0 && config.especialidad === '') {
            setConfig(prev => ({
                ...prev,
                especialidad: especialidadesFiltradas[0].id 
            }));
        }
    }, [config.prestador, especialidadesFiltradas, config.especialidad]);

    useEffect(() => {
        if (config.prestador && lugaresFiltrados.length > 0 && config.lugarAtencion === '') {
            setConfig(prev => ({
                ...prev,
                lugarAtencion: lugaresFiltrados[0].id
            }));
        }
    }, [config.prestador, lugaresFiltrados, config.lugarAtencion]); 

    const handleConfigChange = (e) => {
        const { name, value } = e.target;
        
        setConfig(prev => {
            const newState = { ...prev, [name]: value };
            if (name === 'prestador') {
                newState.especialidad = ''; 
                newState.lugarAtencion = ''; 
            }
            return newState;
        });
    };

    const handleDiaSelectChange = (e) => {
        setDiaSeleccionado(e.target.value);
    };

    const handleNuevoHorarioChange = (e) => {
        const { name, value } = e.target;
        setNuevoHorario(prev => ({ ...prev, [name]: value }));
    };

    const handleAddHorario = () => {
        if (!nuevoHorario.horaInicio || !nuevoHorario.horaFin || !nuevoHorario.duracion) {
            alert('Por favor, completa todos los campos de horario.');
            return;
        }
        if (nuevoHorario.horaInicio >= nuevoHorario.horaFin) {
            alert('La hora de inicio debe ser anterior a la hora de fin.');
            return;
        }
        
        setAgendaHorarios(prev => ({
            ...prev,
            [diaSeleccionado]: [...prev[diaSeleccionado], nuevoHorario]
        }));
        
        setNuevoHorario(initialHorario);
    };

    const handleRemoveHorario = (day, indexToRemove) => {
        setAgendaHorarios(prev => ({
            ...prev,
            [day]: prev[day].filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const diasConHorario = Object.keys(agendaHorarios).filter(day => agendaHorarios[day].length > 0);
        if (!config.prestador || !config.especialidad || !config.lugarAtencion) {
             alert('Debes seleccionar prestador, especialidad y lugar de atención.');
             return;
        }
        if (diasConHorario.length === 0) {
             alert('Debes añadir al menos un bloque de horario a algún día.');
             return;
        }
        const dataFinal = {
            ...config,
            agenda: agendaHorarios, 
        };
        console.log("Datos a enviar al Backend:", dataFinal);
        alert('Agenda guardada con éxito');
    };

    if (error) {
        return <div className="error-state">{error} ❌</div>;
    }

    return (
        <form className="form-nueva-agenda-container" onSubmit={handleSubmit}>
            <div className="section-select-nueva-agenda">
                <InputSelect 
                    text="Prestador" 
                    listaDeOpciones={dataOptions.PRESTADORES} 
                    handleChange={handleConfigChange} 
                    value={config.prestador} 
                    name="prestador"
                    defaultText="Selecciona un prestador"
                />
                
                <InputSelect 
                    text="Especialidad" 
                    listaDeOpciones={especialidadesFiltradas} 
                    handleChange={handleConfigChange} 
                    value={config.especialidad} 
                    name="especialidad"
                    defaultText="Selecciona una especialidad"
                    disabled={!config.prestador} 
                />
                
                <InputSelect 
                    text="Lugar de atención" 
                    listaDeOpciones={lugaresFiltrados} 
                    handleChange={handleConfigChange} 
                    value={config.lugarAtencion} 
                    name="lugarAtencion"
                    defaultText="Selecciona un lugar"
                    disabled={!config.prestador} 
                />
            </div>
            <SubTitleSection text="Horarios" />
            <div className="add-horario-section">
                <InputSelect
                        text="Día"
                        listaDeOpciones={DIAS_SEMANA.map(day => ({ 
                        id: day.id, 
                        descripcion: day.label 
                        }))} 
                        handleChange={handleDiaSelectChange}
                        value={diaSeleccionado}
                        name="diaSemana"
                        defaultText="Selecciona un día"
                    />
                <div className="add-horario-group">
                    <div className="input-with-label">
                        <label className="input-label">Inicio</label>
                        <input type="time" name="horaInicio" value={nuevoHorario.horaInicio} onChange={handleNuevoHorarioChange} className="time-input" />
                    </div>
                    <div className="input-with-label">
                        <label className="input-label">Fin</label>
                        <input type="time" name="horaFin" value={nuevoHorario.horaFin} onChange={handleNuevoHorarioChange} className="time-input" />
                    </div>
                    <div className="input-with-label">
                        <label className="input-label">Duración (min)</label>
                        <input type="number" name="duracion" value={nuevoHorario.duracion} onChange={handleNuevoHorarioChange} min="5" step="5" className="duration-input" />
                    </div>
                    <AddButton onClick={handleAddHorario} />
                </div>
            </div>
                    

            {/* Horarios agregados */}
            <div className="section-group agenda-visualizacion">
                <SubTitleSection text="Horarios cargados" />
                
                {Object.keys(agendaHorarios).every(dayKey => agendaHorarios[dayKey].length === 0) ? (
                    <div className="no-horarios">
                        <SubTitleSection text="Aún no hay horarios cargados" />
                    </div>
                    
                ) : (
                    Object.keys(agendaHorarios).map(dayKey => {
                        const horariosDelDia = agendaHorarios[dayKey];
                        const dayLabel = DIAS_SEMANA.find(d => d.id === dayKey)?.label;

                        if (horariosDelDia.length === 0) return null;

                        return (
                            <div key={dayKey} className="agenda-day-block">
                                <h3>{dayLabel} ({horariosDelDia.length} bloques)</h3>
                                <div className="horarios-list-container">
                                    {horariosDelDia.map((horario, index) => (
                                        <div key={index} className="horario-item">
                                            <span className="horario-text">
                                                {horario.horaInicio} a {horario.horaFin} ({horario.duracion} min)
                                            </span>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveHorario(dayKey, index)} 
                                                className="remove-horario-btn"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="form-footer">
                <SaveAgenda type="submit" />
            </div>
        </form>
    );
}