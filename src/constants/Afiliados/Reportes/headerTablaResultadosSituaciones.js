export const headerTablaResultadosSituaciones = [
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
