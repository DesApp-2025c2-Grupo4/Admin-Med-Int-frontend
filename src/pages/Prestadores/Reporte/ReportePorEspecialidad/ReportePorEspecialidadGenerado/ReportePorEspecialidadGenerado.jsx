import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { Loader } from "../../../../../components/Loader/Loader.jsx";
import { useGetPrestadoresPorEspecialidad } from "../../../../../hooks/Prestador/useGetPrestadoresPorEspecialidad.jsx";

export function ReportePorEspecialidadGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidad, especialidadId } = location.state;

  //obtener prestadores por especialidad
  const { prestadores, loadingPrestadores, error } = useGetPrestadoresPorEspecialidad(especialidadId);

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
        return item.apellido ? value : "-";
      },
    },
    {
      field: "tipoPrestador",
      titulo: "Tipo de prestador",
    },
  ];

  return (
    <>
      {loadingPrestadores ? (
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
          <Loader />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : prestadores && prestadores.length > 0 ? (
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