export const headerTablaResultadosAltaPeriodo = [
    { titulo: "Cuil/Cuit", field: "cuilCuit" },
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
    { titulo: "Tipo de prestador", field: "tipoPrestador" },
    { titulo: "Fecha Alta", field: "fechaAlta" }
  ];