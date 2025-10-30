import { Link } from "react-router";
import { DeleteIcon } from "../../../assets/icons/Afiliados/DeleteIcon";
import { DetailsIcon } from "../../../assets/icons/Afiliados/DetailsIcon";
import { ModifierIcon } from "../../../assets/icons/Afiliados/ModifierIcon";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export function TableAgenda({ listHeader, data }) {
  /*
    Entrada: 
      -> listHeader: Lista de encabezados para la tabla. Tiene la siguiente estructura
        listHeader: ['encabezado1',...,'encabezadoN']
      -> data: lista de horarios. tiene la siguiente estructura
        data [
            {
                agendaId: 1,
                prestadorId: 1,
                diaDeSemana: [{ idDia: 1, descripcion: "Lunes" }],
                horario: [
                {
                    idHorario: 1,
                    idDia: 1,
                    horarioInicio: "12:30",
                    horarioFinal: "15:00",
                    duracionTurno: "150",
            },
        ]
  */
  return (
    <div className="tablePrestador__container">
      <table className="tablePrestador__table">
        {/* Header de la tabla */}
        <thead className="tablePrestador__thead-container">
          <tr className="tablePrestador__thead-tr">
            {listHeader?.map((head, index) => (
              <th
                className={`tablePrestador__thead-th ${
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

        <tbody className="tablePrestador__tbody-container">
          {data?.map((d) => {
            return (
              <tr className="tablePrestador__tbody-tr" key={d.agendaId}>
                <td className="tablePrestador__tbody-td">{`${d.prestador?.nombre}, ${d.prestador?.apellido}`}</td>
                <td className="tablePrestador__tbody-td">
                  {d.prestador?.especialidad?.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-${d.agendaId}`}
                        data-tooltip-content={d.prestador?.especialidad
                          .map((e) => e.descripcion)
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        {d.prestador.especialidad[0].descripcion}...
                      </span>
                      <Tooltip
                        id={`tooltip-${d.agendaId}`}
                        place="top"
                        style={{
                          background: "#255d99ff",
                          whiteSpace: "pre-line",
                        }}
                      />
                    </>
                  ) : (
                    <span>{d.prestador?.especialidad[0]?.descripcion}</span>
                  )}
                </td>
                <td className="tablePrestador__tbody-td">
                  {d.agendas.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-horario-${d.agendaId}`}
                        data-tooltip-content={d.agendas
                          .map((agenda) => {
                            const horario = agenda.horarios[0]; 
                            if (horario) {
                              return `${agenda.dia.descripcion}: ${horario.horarioInicio} - ${horario.horarioFinal}`;
                            } else {
                              return `${agenda.dia.descripcion}: (sin horario)`;
                            }
                          })
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        {`${d.agendas[0].dia.descripcion}: ${
                          d.agendas[0].horarios[0]?.horarioInicio || ""
                        } - ${d.agendas[0].horarios[0]?.horarioFinal || ""}...`}
                      </span>

                      <Tooltip
                        id={`tooltip-horario-${d.agendaId}`}
                        place="top"
                        style={{
                          background: "#255d99ff",
                          whiteSpace: "pre-line",
                        }}
                      />
                    </>
                  ) : (
                    <span>
                      {`${d.agendas[0].dia.descripcion}: ${
                        d.agendas[0].horarios[0]?.horarioInicio || ""
                      } - ${d.agendas[0].horarios[0]?.horarioFinal || ""}`}
                    </span>
                  )}
                </td>
                <td className="tablePrestador__tbody-td">
                  {d.prestador?.direccion?.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-direccion-${d.agendaId}`}
                        data-tooltip-content={d.prestador.direccion
                          .map((dir) => `${dir.calle} ${dir.nro || ""}`)
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        {`${d.prestador.direccion[0].calle}...`}
                      </span>

                      <Tooltip
                        id={`tooltip-direccion-${d.agendaId}`}
                        place="top"
                        style={{
                          background: "#255d99ff",
                        }}
                      />
                    </>
                  ) : (
                    <span>{`${d.prestador?.direccion[0].calle} ${
                      d.prestador?.direccion[0].nro || ""
                    }`}</span>
                  )}
                </td>
                <td className="tablePrestador__tbody-td">
                  {d.prestador?.telefonos?.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-telefono-${d.agendaId}`}
                        data-tooltip-content={d.prestador?.telefonos
                          .map((t) => `tel: ${t.nroTelefono}`)
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        {`${d.prestador.telefonos[0].nroTelefono}...`}
                      </span>

                      <Tooltip
                        id={`tooltip-telefono-${d.agendaId}`}
                        place="top"
                        style={{
                          background: "#255d99ff",
                        }}
                      />
                    </>
                  ) : (
                    <span>{d.prestador?.telefonos[0].nroTelefono}</span>
                  )}
                </td>
                <td id="icons" className="tablePrestador__tbody-td sinBorde">
                  <Link>
                    <DeleteIcon></DeleteIcon>
                  </Link>
                  <Link>
                    <ModifierIcon></ModifierIcon>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
