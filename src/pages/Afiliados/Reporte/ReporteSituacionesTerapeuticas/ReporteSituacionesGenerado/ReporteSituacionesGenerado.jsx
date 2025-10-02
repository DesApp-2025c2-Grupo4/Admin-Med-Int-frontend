import { useLocation, useNavigate } from "react-router";
import { TablaResultados } from "../../ui/TablaResultados/TablaResultados";
import { Button } from "../../ui/Button/Button";


export function ReporteSituacionesGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const integrante = location.state?.integrante || [];
  const situaciones = integrante.situacionesTerapeuticas || [];
  console.log(location.state);

  const handleVolver = () => {
    navigate(-1);
  };

  const columnasSituaciones = [
  { titulo: "Descripción", field: "descripcion" },
  { 
    titulo: "¿es Crónica?", 
    field: "esCronica",
    render: (valor) => (valor ? "Sí" : "No"),
  },
  { 
    titulo: "Fecha Inicio", 
    field: "fechaInicio",
    render: (valor) => new Date(valor).toLocaleDateString(),
  },
  { 
    titulo: "Fecha Fin", 
    field: "fechaFin",
    render: (valor) => valor ? new Date(valor).toLocaleDateString() : "Crónica",
  },
]

  return (
    <>
    {situaciones.length > 0 ? (
        <TablaResultados
            datos={situaciones}
            columnas={columnasSituaciones}
            keyField="personaId"
            titulo={`Resultados del Reporte de situaciones terapéuticas de ${integrante.nombre} ${integrante.apellido}`}
        />
        ) : (
            <p>El integrante: {integrante.nombre} {integrante.apellido} no tiene situaciones terapéuticas actualmente.</p>            
            )
        }
      <Button text="Volver" onClick={handleVolver} />
    </>
  )
}
