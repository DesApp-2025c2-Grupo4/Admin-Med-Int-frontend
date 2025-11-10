import React, { useState, useMemo, useEffect } from "react";
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx";
import { DIAS_SEMANA } from "../../../../constants/listDias.js";
import { useGetPrestadoresNuevaAgenda } from "../../../../hooks/useGetPrestadoresNuevaAgenda.jsx";
import "./NuevaAgendaForm.css";
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx";
import { SaveAgenda } from "../../../../components/ui/SaveAgenda/SaveAgenda.jsx";
import { crearAgenda } from "../../../../services/agenda/crearAgenda.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialHorario = {
  horarioInicio: "06:00",
  horarioFinal: "13:00",
  duracionTurno: "30",
};

const initialAgendaHorarios = DIAS_SEMANA.reduce((acc, dia) => {
  acc[dia.idDia] = [];
  return acc;
}, {});

export function NuevaAgendaForm() {
  const { dataOptions, isLoading, error } = useGetPrestadoresNuevaAgenda();

  const navigate = useNavigate();

  const [config, setConfig] = useState({
    prestador: "",
    especialidad: "",
    lugarAtencion: "",
  });

  useEffect(() => {
    if (!isLoading && dataOptions.PRESTADORES.length > 0 && !config.prestador) {
      const prestadorId = dataOptions.PRESTADORES[0]?.id ?? "";

      const firstEspecialidad = dataOptions.ESPECIALIDADES[0]?.id ?? "";
      const firstLugar = dataOptions.LUGARES_ATENCION[0]?.id ?? "";

      setConfig({
        prestador: prestadorId,
        especialidad: firstEspecialidad,
        lugarAtencion: firstLugar,
      });
    }
  }, [isLoading, dataOptions]);

  useEffect(() => {
    if (config.prestador && dataOptions.rawList.length > 0) {
      const prestador = dataOptions.rawList.find(
        (p) => String(p.prestadorId) === String(config.prestador)
      );

      if (prestador) {
        const nuevaEspecialidad =
          prestador.especialidad?.[0]?.especialidadId ?? "";
        const nuevoLugar = prestador.direccion?.[0]?.direccionId ?? "";
        if (
          config.especialidad !== nuevaEspecialidad ||
          config.lugarAtencion !== nuevoLugar
        ) {
          setConfig((prev) => ({
            ...prev,
            especialidad: nuevaEspecialidad,
            lugarAtencion: nuevoLugar,
          }));
        }
      }
    }
  }, [config.prestador, dataOptions.rawList]);

  const [diaSeleccionado, setDiaSeleccionado] = useState(DIAS_SEMANA[0].idDia);
  const [agendaHorarios, setAgendaHorarios] = useState(initialAgendaHorarios);

  const [nuevoHorario, setNuevoHorario] = useState(initialHorario);

  const especialidadesFiltradas = useMemo(() => {
    const selectedPrestadorId = config.prestador;
    const rawList = dataOptions.rawList;
    if (!selectedPrestadorId || rawList.length === 0) {
      return dataOptions.ESPECIALIDADES;
    }
    const prestador = rawList.find(
      (p) => p.prestadorId === Number(selectedPrestadorId)
    );
    if (
      prestador &&
      prestador.especialidad &&
      prestador.especialidad.length > 0
    ) {
      return prestador.especialidad.map((e) => ({
        id: e.especialidadId,
        descripcion: e.descripcion,
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

    const prestador = rawList.find(
      (p) => p.prestadorId === Number(selectedPrestadorId)
    );

    if (prestador && prestador.direccion && prestador.direccion.length > 0) {
      return prestador.direccion.map((d) => ({
        id: d.direccionId,
        descripcion: `${d.calle} ${d.nro}`,
      }));
    }

    return [];
  }, [config.prestador, dataOptions.rawList]);

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleDiaSelectChange = (e) => {
    setDiaSeleccionado(e.target.value);
  };

  const handleNuevoHorarioChange = (e) => {
    const { name, value } = e.target;
    setNuevoHorario((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHorario = () => {
    if (
      !nuevoHorario.horarioInicio ||
      !nuevoHorario.horarioFinal ||
      !nuevoHorario.duracionTurno
    ) {
      toast.error("Por favor, completa todos los campos de horario.")
      return;
    }
    if (nuevoHorario.horarioInicio >= nuevoHorario.horarioFinal) {
      toast.error("La hora de inicio debe ser anterior a la hora de fin.")
      return;
    }

    const horariosDelDia = agendaHorarios[diaSeleccionado];
    const horaInicio = nuevoHorario.horarioInicio;
    const horaFin = nuevoHorario.horarioFinal;

    const seSobrepisa = horariosDelDia.some(
      ({ horarioInicio, horarioFinal }) => {
        return (
          (horaInicio >= horarioInicio && horaInicio < horarioFinal) ||
          (horaFin > horarioInicio && horaFin <= horarioFinal) ||
          (horaInicio <= horarioInicio && horaFin >= horarioFinal)
        );
      }
    );

    if (seSobrepisa) {
      toast.error("El horario se superpone con uno ya existente en este día.")
      return;
    }

    setAgendaHorarios((prev) => ({
      ...prev,
      [diaSeleccionado]: [...prev[diaSeleccionado], nuevoHorario],
    }));

    setNuevoHorario(initialHorario);
  };

  const handleRemoveHorario = (day, indexToRemove) => {
    setAgendaHorarios((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const diasConHorario = Object.keys(agendaHorarios).filter(
        (day) => agendaHorarios[day].length > 0
      );
      if (!config.prestador || !config.especialidad || !config.lugarAtencion) {
        toast.error("Debes seleccionar prestador, especialidad y lugar de atención.")
        return;
      }
      if (diasConHorario.length === 0) {
        toast.error("Debes añadir al menos un bloque de horario a algún día.")
        return;
      }

      const agendas = diasConHorario.map((dayKey) => ({
        idDia: Number(dayKey),
        horarios: agendaHorarios[dayKey].map((h) => ({
          horarioInicio: h.horarioInicio,
          horarioFinal: h.horarioFinal,
          duracionTurno: h.duracionTurno,
        })),
      }));

      const dataFinal = {
        prestadorId: Number(config.prestador),
        especialidadId: Number(config.especialidad),
        direccionId: Number(config.lugarAtencion),
        agendas,
      };
      const nuevoPrestador = await crearAgenda(dataFinal);
      toast.success("Agenda guardada con éxito")
      navigate("/agenda/gestionar");
    } catch (error) {
      toast.error("Hubo un error al crear una nueva agenda")
    }
  };

  if (error) {
    return (
      <div className="sin-resultados-section">
        <SubTitleSection text={"No se pudo cargar el formulario."} />
      </div>
    );
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
          listaDeOpciones={DIAS_SEMANA.map((day) => ({
            id: day.idDia,
            descripcion: day.label,
          }))}
          handleChange={handleDiaSelectChange}
          value={diaSeleccionado}
          name="diaSemana"
          defaultText="Selecciona un día"
        />
        <div className="add-horario-group">
          <div className="input-with-label">
            <label className="input-label">Inicio</label>
            <input
              type="time"
              name="horarioInicio"
              value={nuevoHorario.horarioInicio}
              onChange={handleNuevoHorarioChange}
              className="time-input"
            />
          </div>
          <div className="input-with-label">
            <label className="input-label">Fin</label>
            <input
              type="time"
              name="horarioFinal"
              value={nuevoHorario.horarioFinal}
              onChange={handleNuevoHorarioChange}
              className="time-input"
            />
          </div>
          <div className="input-with-label">
            <label className="input-label">Duración (min)</label>
            <input
              type="number"
              name="duracionTurno"
              value={nuevoHorario.duracionTurno}
              onChange={handleNuevoHorarioChange}
              min="5"
              step="5"
              className="duration-input"
            />
          </div>
          <AddButton onClick={handleAddHorario} />
        </div>
      </div>

      {/* Horarios agregados */}
      <div className="section-group agenda-visualizacion">
        <SubTitleSection text="Horarios cargados" />

        {Object.keys(agendaHorarios).every(
          (dayKey) => agendaHorarios[dayKey].length === 0
        ) ? (
          <div className="no-horarios">
            <SubTitleSection text="Aún no hay horarios cargados" />
          </div>
        ) : (
          Object.keys(agendaHorarios).map((dayKey) => {
            const horariosDelDia = agendaHorarios[dayKey];
            const dayLabel = DIAS_SEMANA.find(
              (d) => String(d.idDia) === String(dayKey)
            )?.label;

            if (horariosDelDia.length === 0) return null;

            return (
              <div key={dayKey} className="agenda-day-block">
                <h3>
                  {dayLabel} ({horariosDelDia.length} bloques)
                </h3>
                <div className="horarios-list-container">
                  {horariosDelDia.map((horario, index) => (
                    <div key={index} className="horario-item">
                      <span className="horario-text">
                        {horario.horarioInicio} a {horario.horarioFinal} (
                        {horario.duracionTurno} min)
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
