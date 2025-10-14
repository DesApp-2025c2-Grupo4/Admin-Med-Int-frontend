import "../ui/TableIntegrantes.css";
import { TableBodyIntegrantes } from "./TableBodyIntegrantes/TableBodyIntegrantes";

export function TableIntegrantes({ listHeader, data }) {
  return (
    <div className="tableGrupo__container">
      <table className="tableGrupo__table">
        {/* Header de la tabla */}
        <thead className="tableGrupo__thead-container">
          <tr className="tableGrupo__thead-tr">
            {listHeader?.map((head, index) => (
              <th
                className={`tableGrupo__thead-th ${
                  index === listHeader.length - 1 ? "sinBorde" : ""
                }`}
                key={index}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body de la tabla */}
        <TableBodyIntegrantes integrantesDelGrupo={data} />
        {/* Controlamos si esta cargando para centrar loader */}
      </table>
    </div>
  );
}
