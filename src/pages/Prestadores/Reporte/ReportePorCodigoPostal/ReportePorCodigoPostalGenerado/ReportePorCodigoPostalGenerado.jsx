import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/Button/Button.jsx";
import { TablaResultados } from "../../../../../components/ui/TablaResultados/TablaResultados.jsx";
import { Loader } from "../../../../../components/Loader/Loader.jsx";
import { useGetPrestadoresPorCodigoPostal } from "../../../../../hooks/Prestador/useGetPrestadoresPorCodigoPostal.jsx";

export function ReportePorCodigoPostalGenerado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { codigoPostal } = location.state;
  
  const { prestadores, loadingPrestadores, error } = useGetPrestadoresPorCodigoPostal(codigoPostal);

  const handleVolver = () => {
    navigate(-1);
  };

  //columnas de la tabla
  const columnasCodigoPostal = [
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
        // Mostrar todas las direcciones del prestador que coinciden con el código postal
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
          columnas={columnasCodigoPostal}
          keyField="prestadorId"
          titulo={`Prestadores en código postal: ${codigoPostal} (Total: ${prestadores.length})`}
        />
      ) : (
        <p className="mensaje-vacio">
          No se encontraron prestadores en el código postal: <strong>{codigoPostal}</strong>
        </p>
      )}
      <Button text="Volver" onClick={handleVolver} />
    </>
  );
}