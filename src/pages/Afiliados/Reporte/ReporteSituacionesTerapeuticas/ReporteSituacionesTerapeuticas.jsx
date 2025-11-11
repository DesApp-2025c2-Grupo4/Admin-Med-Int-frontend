import "./ReporteSituacionesTerapeuticas.css";
import { ReporteContainer } from "../../../../components/ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../../../../components/ui/Button/Button.jsx";
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getGrupoFamiliar } from "../../../../services/afiliados/getGrupoFamiliar.js";
import { Loader } from "../../../../components/Loader/Loader.jsx";

export function ReporteSituacionesTerapeuticas() {
  const [nroGrupo, setNroGrupo] = useState("");
  const [grupoEncontrado, setGrupoEncontrado] = useState(null);
  const [integranteSeleccionado, setIntegranteSeleccionado] = useState(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNroGrupoChange = (e) => {
    setNroGrupo(e.target.value);
    setGrupoEncontrado(null);
    setIntegranteSeleccionado(null);
    setBusquedaRealizada(false);
  };

  const handleBuscarGrupo = async () => {
    setLoading(true);
    try {
      const grupoFiltrado = await getGrupoFamiliar(parseInt(nroGrupo));
      setGrupoEncontrado(grupoFiltrado || null);
      setIntegranteSeleccionado(null);
      setBusquedaRealizada(true);
    } catch (error) {
      console.error(`Error al buscar el grupo ${nroGrupo}:`, error);
      setGrupoEncontrado(null);
      setBusquedaRealizada(true);
    } finally {
      setLoading(false);
    }
  };

  const handleIntegranteChange = (e) => {
    const value = e.target.value;
    if (!grupoEncontrado || value === "") {
      setIntegranteSeleccionado(null);
      return;
    }
    if (value === "todos") {
      setIntegranteSeleccionado("todos");
      return;
    }
    const integrante = grupoEncontrado.integrantes.find(
      (i) => i.personaId === parseInt(value)
    );
    setIntegranteSeleccionado(integrante || null);
  };

  const handleGenerarReporte = () => {
    if (integranteSeleccionado === "todos") {
      navigate("reporte-situaciones-generado", {
        state: { integrantes: grupoEncontrado.integrantes, nroGrupo },
      });
    } else if (integranteSeleccionado) {
      navigate("reporte-situaciones-generado", {
        state: { integrante: integranteSeleccionado },
      });
    }
  };

  return (
    <ReporteContainer title="Reporte de situaciones terapéuticas">
      <InputText
        text="Credencial del Grupo"
        name="nroGrupo"
        value={nroGrupo}
        handleChange={handleNroGrupoChange}
      />
      <Button text="Buscar Grupo" onClick={handleBuscarGrupo} />

      {loading && <Loader />}

      {busquedaRealizada &&
        grupoEncontrado === null &&
        nroGrupo.trim() !== "" && (
          <p className="error">
            No se encontró un grupo familiar con esa credencial.
          </p>
        )}

      {grupoEncontrado && (
        <div className="input-container">
          <label htmlFor="integrante">Seleccione un integrante</label>
          <select
            id="integrante"
            name="integrante"
            value={
              integranteSeleccionado === "todos"
                ? "todos"
                : integranteSeleccionado?.personaId || ""
            }
            onChange={handleIntegranteChange}
          >
            <option value="">Seleccione un integrante</option>
            <option value="todos">Todos los integrantes</option>
            {grupoEncontrado.integrantes.map((i) => (
              <option key={i.personaId} value={i.personaId}>
                {i.nombre} {i.apellido}{" "}
                {i.esTitular ? "(Titular)" : `(${i.parentesco || "Familiar"})`}
              </option>
            ))}
          </select>
        </div>
      )}
      {integranteSeleccionado && (
        <Button
          text="Generar reporte"
          onClick={handleGenerarReporte}
          className={!integranteSeleccionado ? "disabled" : ""}
        />
      )}
    </ReporteContainer>
  );
}
