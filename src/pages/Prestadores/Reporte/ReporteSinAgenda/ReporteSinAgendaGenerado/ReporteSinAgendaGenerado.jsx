import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { Loader } from "../../../../../components/Loader/Loader.jsx";
import { useGetPrestadoresSinAgenda } from "../../../../../hooks/Prestador/useGetPrestadoresSinAgenda.jsx";

export function ReportePrestadoresSinAgendaGenerado() {
  const navigate = useNavigate();

  const { prestadores, loadingPrestadores, error } = useGetPrestadoresSinAgenda();

  const handleVolver = () => {
    navigate(-1);
  };

  //columnas de la tabla
  const columnasSinAgenda = [
    {
      field: "nombreCompleto",
      titulo: "Nombre Completo",
      render: (value, item) => {
        const nombre = item.nombre || "";
        const apellido = item.apellido || "";
        const nombreCompleto = `${nombre} ${apellido}`.trim(); 
        return nombreCompleto || "-"; 
      },
    },
    {
      field: "tipoPrestador",
      titulo: "Tipo de prestador",
    },
    {
      field: "direccion",
      titulo: "Direcciones",
      render: (value) => {
        if (!value || value.length === 0) return "-";
        // Mostrar todas las direcciones del prestador
        return value.map((dir, index) => (
          <div key={index}>
            {dir.calle} {dir.nro ? dir.nro : "S/N"}
          </div>
        ));
      },
    },
  ];
  
  return (
    <>
      {loadingPrestadores ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          <Loader />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : prestadores && prestadores.length > 0 ? (
        <TablaResultados
          datos={prestadores}
          columnas={columnasSinAgenda}
          keyField="prestadorId"
          titulo={`Prestadores sin agenda (Total: ${prestadores.length})`}
        />
      ) : (
        <p className="mensaje-vacio">
          No hay prestadores sin agendas
        </p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}