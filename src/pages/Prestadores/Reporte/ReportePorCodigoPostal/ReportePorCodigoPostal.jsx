import { useState } from "react";
import { ReporteContainer } from "../../../../components/ui/ReporteContainer/ReporteContainer.jsx";
import { Button } from "../../../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/Loader/Loader.jsx";
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx";

export function ReportePorCodigoPostal() {
  const [loading, setLoading] = useState(false);
  const [codigoPostal, setCodigoPostal] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerarReporte = async () => {
    if (!codigoPostal) {
      setError("Por favor ingrese un código postal");
      return;
    }

    setLoading(true);
    setError("");
    try {
      navigate("reporte-por-codigo-postal-generado", {
        state: {
          codigoPostal: codigoPostal.trim()
        },
      });
    } catch (err) {
      console.error("Error al generar reporte:", err);
      setError("Error al generar el reporte");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCodigoPostal = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Permitir solo números
    setCodigoPostal(value);
    if (error) setError(""); // Limpiar error al escribir
  };

  return (
    <ReporteContainer title="Reporte de prestadores por código postal">
      <div className="inputs-container">
        <InputText
          text="Código Postal"
          name="codigoPostal"
          value={codigoPostal}
          handleChange={handleChangeCodigoPostal}
          requerido={true}
          error={error}
          type="text"
          placeholder="código postal"
        />

        {codigoPostal && !loading && (
          <Button text="Generar reporte" onClick={handleGenerarReporte} />
        )}
        {loading && <Loader />}
      </div>
    </ReporteContainer>
  );
}