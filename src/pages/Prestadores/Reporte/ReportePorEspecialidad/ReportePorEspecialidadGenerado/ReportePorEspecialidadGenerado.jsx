import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";

export function ReportePorEspecialidadGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prestadores, especialidad } = location.state;

  const handleVolver = () => {
    navigate(-1);
  };

  //columnas de la tabla
  const columnasEspecialidad = [
    {
      field: "nombre",
      titulo: "Nombre",
    },
    {
      field: "apellido",
      titulo: "Apellido",
      render: (value, item) => {
        return item.tipoPrestador === "Independiente" ? value : "-";
      },
    },
    {
      field: "tipoPrestador",
      titulo: "Tipo de prestador",
    },
  ];

  return (
    <>
      {prestadores.length > 0 ? (
        <TablaResultados
          datos={prestadores}
          columnas={columnasEspecialidad}
          keyField="prestadorId"
          titulo={`Prestadores con especialidad: ${especialidad} (Total: ${prestadores.length})`}
        />
      ) : (
        <p className="mensaje-vacio">
          No se encontraron prestadores con la especialidad: <strong>{especialidad}</strong>
        </p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}