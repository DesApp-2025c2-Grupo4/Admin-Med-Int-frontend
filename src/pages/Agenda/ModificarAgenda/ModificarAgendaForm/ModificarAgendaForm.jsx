import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx";
import { DIAS_SEMANA } from "../../../../constants/listDias.js";
import { useGetPrestadoresNuevaAgenda } from "../../../../hooks/useGetPrestadoresNuevaAgenda.jsx";
import "../../NuevaAgenda/NuevaAgendaForm/NuevaAgendaForm.css";
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx";
import { SaveAgenda } from "../../../../components/ui/SaveAgenda/SaveAgenda.jsx";
import { modificarAgenda } from "../../../../services/agenda/modificarAgenda.js";

const initialHorario = {
  horarioInicio: "06:00",
  horarioFinal: "13:00",
  duracionTurno: "30",
};

const initialAgendaHorarios = DIAS_SEMANA.reduce((acc, dia) => {
  acc[dia.idDia] = [];
  return acc;
}, {});

export function ModificarAgendaForm({ initialData }) {
  const { id } = useParams();
  const { dataOptions, isLoading, error: errorOpciones } =
    useGetPrestadoresNuevaAgenda();

  const [config, setConfig] = useState({
    prestador: "",
    especialidad: "",
    lugarAtencion: "",
  });

  const [diaSeleccionado, setDiaSeleccionado] = useState(DIAS_SEMANA[0].idDia);
  const [agendaHorarios, setAgendaHorarios] = useState(initialAgendaHorarios);
  const [nuevoHorario, setNuevoHorario] = useState(initialHorario);

  // 🧠 Cargar datos de la agenda existente
  useEffect(() => {
    if (initialData) {
      setConfig({
        prestador: String(initialData.prestadorId),
        especialidad: String(initialData.especialidadId),
        lugarAtencion: String(initialData.direccionId),
      });

      const horariosIniciales = DIAS_SEMANA.reduce((acc, dia) => {
        const diaAgenda = initialData.agendas?.find(
          (a) => Number(a.idDia) === Number(dia.idDia)
        );
        acc[dia.idDia] = diaAgenda?.horarios || [];
        return acc;
      }, {});
      setAgendaHorarios(horariosIniciales);
    }
  }, [initialData]);

  // 🧩 Manejo de selects
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
      alert("Por favor, completa todos los campos de horario.");
      return;
    }

    if (nuevoHorario.horarioInicio >= nuevoHorario.horarioFinal) {
      alert("La hora de inicio debe ser anterior a la hora de fin.");
      return;
    }

    const horariosDelDia = agendaHorarios[diaSeleccionado];
    const horaInicio = nuevoHorario.horarioInicio;
    const horaFin = nuevoHorario.horarioFinal;

    const seSobrepisa = horariosDelDia.some(
      ({ horarioInicio, horarioFinal }) =>
        (horaInicio >= horarioInicio && horaInicio < horarioFinal) ||
        (horaFin > horarioInicio && horaFin <= horarioFinal) ||
        (horaInicio <= horarioInicio && horaFin >= horarioFinal)
    );

    if (seSobrepisa) {
      alert("El horario se superpone con uno ya existente en este día.");
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

  const especialidadesFiltradas = useMemo(() => {
    const selectedPrestadorId = config.prestador;
    const rawList = dataOptions.rawList || [];
    if (!selectedPrestadorId || rawList.length === 0) {
      return dataOptions.ESPECIALIDADES;
    }
    const prestador = rawList.find(
      (p) => p.prestadorId === Number(selectedPrestadorId)
    );
    return prestador?.especialidad?.map((e) => ({
      id: e.especialidadId,
      descripcion: e.descripcion,
    })) || [];
  }, [config.prestador, dataOptions.rawList, dataOptions.ESPECIALIDADES]);

  const lugaresFiltrados = useMemo(() => {
    const selectedPrestadorId = config.prestador;
    const rawList = dataOptions.rawList || [];
    const prestador = rawList.find(
      (p) => p.prestadorId === Number(selectedPrestadorId)
    );
    return prestador?.direccion?.map((d) => ({
      id: d.direccionId,
      descripcion: `${d.calle} ${d.nro}`,
    })) || [];
  }, [config.prestador, dataOptions.rawList]);

  // ✅ Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const diasConHorario = Object.keys(agendaHorarios).filter(
        (day) => agendaHorarios[day].length > 0
      );

      if (!config.prestador || !config.especialidad || !config.lugarAtencion) {
        alert("Debes seleccionar prestador, especialidad y lugar de atención.");
        return;
      }

      if (diasConHorario.length === 0) {
        alert("Debes añadir al menos un bloque de horario a algún día.");
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

      await modificarAgenda(id, dataFinal);
      alert("Agenda modificada con éxito");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al modificar la agenda");
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (errorOpciones) return <p>Error al cargar opciones.</p>;

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
          disabled
        />

        <InputSelect
          text="Especialidad"
          listaDeOpciones={especialidadesFiltradas}
          handleChange={handleConfigChange}
          value={config.especialidad}
          name="especialidad"
          defaultText="Selecciona una especialidad"
        />

        <InputSelect
          text="Lugar de atención"
          listaDeOpciones={lugaresFiltrados}
          handleChange={handleConfigChange}
          value={config.lugarAtencion}
          name="lugarAtencion"
          defaultText="Selecciona un lugar"
        />
      </div>

      <SubTitleSection text="Horarios" />
      {/* resto del código idéntico */}
      <div className="form-footer">
        <SaveAgenda type="submit" text="Actualizar Agenda" />
      </div>
    </form>
  );
}