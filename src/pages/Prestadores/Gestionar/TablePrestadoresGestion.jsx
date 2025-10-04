import "./TablePrestadoresGestion.css"
import { Loader } from "./../../../components/Loader/Loader";
import { Link } from "react-router";
import { DeleteIcon } from "../../../assets/icons/Afiliados/DeleteIcon";
import { DetailsIcon } from "../../../assets/icons/Afiliados/DetailsIcon";
import { ModifierIcon } from "../../../assets/icons/Afiliados/ModifierIcon";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ToolTipIcon } from "../../../assets/icons/Prestadores/ToolTipIcon";

export function TablePrestadoresGestion({
  listHeader,
  data,
  loadingPrestadores,
}) {
  /*
    Descripcion: este componente renderiza la tabla de prestadores de la sección gestionar prestadores, los estilos son reutilizables para las
    demas tablas colocando las mismas clases.
    Entrada: 
      -> listHeader: Lista de encabezados para la tabla. Tiene la siguiente estructura
        listHeader: ['encabezado1',...,'encabezadoN']
      -> data: lista de prestadores. tiene la siguiente estructura
        data [
            {
                prestadorId: 9,
                nombre: 'Sofia',
                apellido: 'Castro',
                email: 'sofia.castro@algo.com',
                tipoPrestador: 'Independiente',
                telefonos: [{ idTelefono: 9, nro: '2321320' }],
                direccion: [{ idDireccion: 9, calle: 'Mitre', nro: 456 }],
                cuilCuit: '20345678909',
                especialidad: [{ idEspecialidad: 9, descripcion: 'Oftalmologia' }]
            }
        ]
  */
  return (
    <table className="table__container">
      {/* Header de la tabla */}
      <thead className="table__thead-container">
        <tr className="table__thead-tr">
          {listHeader?.map((head, index) => (
            <th
              className={`table__thead-th ${
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

      {/* Controlamos si esta cargando para centrar loader */}

      <tbody className={`table__tbody-container`}>
        {loadingPrestadores ? (
          <tr className="loader-table">
            <td collSpan={listHeader.length} >{<Loader />}</td>
          </tr>
        ) : (
          data?.map((d) => {
            return (
              <tr className="table__tbody-tr" key={d.prestadorId}>
                <td className="table__tbody-td">{d.cuilCuit}</td>
                <td className="table__tbody-td">{`${d.nombre}, ${d.apellido}`}</td>
                <td className="table__tbody-td">{d.codigoPostal}</td>
                <td className="table__tbody-td">
                  {d.especialidad.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-${d.prestadorId}`}
                        data-tooltip-content={d.especialidad
                          .map((e) => e.descripcion)
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        <ToolTipIcon></ToolTipIcon>
                      </span>
                      <Tooltip
                        id={`tooltip-${d.prestadorId}`}
                        place="top"
                        className="!bg-[#0A2E5D] !text-white !px-3 !py-2 !rounded-md !text-sm whitespace-pre-line"
                      />
                    </>
                  ) : (
                    <span>{d.especialidad[0]?.descripcion}</span>
                  )}
                </td>
                <td className="table__tbody-td">
                  <span className="resaltar">{d.tipoPrestador}</span>
                </td>
                <td id="icons" className="table__tbody-td sinBorde">
                  <Link>
                    <DetailsIcon></DetailsIcon>
                  </Link>
                  <Link>
                    <DeleteIcon></DeleteIcon>
                  </Link>
                  <Link>
                    <ModifierIcon></ModifierIcon>
                  </Link>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
