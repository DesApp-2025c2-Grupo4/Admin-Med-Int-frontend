import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { Loader } from "../../../../../components/Loader/Loader.jsx";
import { useGetAllPrestadores } from "../../../../../hooks/useGetAllPrestadores";

export function ReportePorEspecialidadGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { especialidad, especialidadId } = location.state;

  // Obtener todos los prestadores
  const { prestadores, loadingPrestadores, error } = useGetAllPrestadores();

  const handleVolver = () => {
    navigate(-1);
  };

  // Filtrar prestadores por la especialidad seleccionada
  const prestadoresFiltrados = prestadores?.filter(prestador =>
    prestador.especialidad?.some(
      esp => esp.especialidadId === especialidadId
    )
  ) || [];

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
      {loadingPrestadores ? (
        <Loader />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : prestadoresFiltrados.length > 0 ? (
        <TablaResultados
          datos={prestadoresFiltrados}
          columnas={columnasEspecialidad}
          keyField="prestadorId"
          titulo={`Prestadores con especialidad: ${especialidad} (Total: ${prestadoresFiltrados.length})`}
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