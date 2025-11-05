export const headerTablaResultadosSituaciones = (esParaTodos = false) => [
  ...(esParaTodos ? [{ titulo: "Integrante", field: "nombreIntegrante" }] : []), // Solo incluye la columna si es para todos
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
    render: (valor) =>
      valor ? new Date(valor).toLocaleDateString() : "Crónica",
  },
];