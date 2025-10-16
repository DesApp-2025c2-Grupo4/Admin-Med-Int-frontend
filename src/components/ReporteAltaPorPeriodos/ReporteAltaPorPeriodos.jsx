import "./ReporteAltaPorPeriodos.css";
import { InputDate } from "../ui/Input/InputDate/InputDate.jsx";
import { useState } from "react";
import { ReporteContainer } from "../ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

export function ReporteAltaPorPeriodos({data}) {
  const [periodo, setPeriodo] = useState({});
  const navigate = useNavigate();
  const datos = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPeriodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenerarReporte = () => {
    const fechaDesde = periodo.fechaDesde;
    const fechaHasta = periodo.fechaHasta;

    const desde = new Date(fechaDesde);
    const hasta = new Date(fechaHasta);

    const datosFiltrados = datos.filter((d) => {
      const fechaAltaDate = new Date(d.fechaAlta);
      return fechaAltaDate >= desde && fechaAltaDate <= hasta;
    });

    navigate("reporte-alta-generado", {
      state: {
        resultados: datosFiltrados,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
      },
    });
  };

  return (
    <ReporteContainer title="Reporte de alta por periodos">
      <div className="inputs-container">
        <InputDate
          text="Fecha desde"
          name="fechaDesde"
          value={periodo.fechaDesde || ""}
          handleChange={handleChange}
        />
        <InputDate
          text="Fecha hasta"
          name="fechaHasta"
          value={periodo.fechaHasta || ""}
          handleChange={handleChange}
        />
        {periodo.fechaDesde && periodo.fechaHasta && (
          <Button text="Generar reporte" onClick={handleGenerarReporte} />
        )}
      </div>
    </ReporteContainer>
  );
}
