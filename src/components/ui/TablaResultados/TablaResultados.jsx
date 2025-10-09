import "./TablaResultados.css";

export function TablaResultados({
  datos = [],
  columnas = [],
  keyField = "id",
  titulo = "Resultados",
}) {
  return (
    <div className="resultados-container">
      <h3>{titulo}</h3>
      <table className="tabla-resultados">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.field}>{col.titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item[keyField]}>
              {columnas.map((col) => (
                <td key={`${item[keyField]}-${col.field}`}>
                  {col.render ? col.render(item[col.field], item) : item[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
