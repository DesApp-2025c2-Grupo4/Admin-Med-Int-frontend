export const headerTablaResultadosAltaPeriodo = [
    { titulo: "Credencial", field: "credencial" },
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
    { titulo: "Fecha Alta", field: "fechaAlta" }
  ];