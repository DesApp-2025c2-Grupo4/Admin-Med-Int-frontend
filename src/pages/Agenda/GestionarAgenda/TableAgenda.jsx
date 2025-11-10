import { Link } from "react-router";
import { DeleteIcon } from "../../../assets/icons/Afiliados/DeleteIcon";
import { DetailsIcon } from "../../../assets/icons/Afiliados/DetailsIcon";
import { ModifierIcon } from "../../../assets/icons/Afiliados/ModifierIcon";
import { useEliminarUnaAgenda } from "../../../hooks/Agenda/useEliminarAgenda";
import { ModalDeConfirmacion } from "../../../components/ModalDeConfirmacion/ModalDeConfirmacion";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export function TableAgenda({ listHeader, data }) {
  const [fullAgenda, setAgenda] = useState(data);
  //Estado de modal
  const [showModal, setShowModal] = useState(false);
  //Estado del prestador a eliminar
  const [idAgenda, setIdAgenda] = useState();
  //Llamada al hook
  const { error, loading, eliminarAgenda } = useEliminarUnaAgenda(setAgenda);

  useEffect(() => {
    setAgenda(data);
  }, [data]);

  const handleEliminarAgenda = () => {
    setShowModal(false);
    eliminarAgenda(idAgenda);
    setIdAgenda(null);
  };
  //HandleClick
  const handleClick = (id) => {
    setShowModal(true);
    setIdAgenda(id);
  };

  return (
    <div className="tablePrestador__container">
      {showModal && (
        <ModalDeConfirmacion
          text={"¿Seguro que deseas eliminar?"}
          funcionCancelar={() => setShowModal(false)}
          funcionConfirmar={handleEliminarAgenda}
        />
      )}
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
          {fullAgenda?.map((d) => {
            return (
              <tr className="tablePrestador__tbody-tr" key={d.agendaId}>
                <td className="tablePrestador__tbody-td">
                  {d.prestador.apellido
                    ? `${d.prestador.nombre}, ${d.prestador.apellido}`
                    : `${d.prestador.nombre}`}
                </td>
                <td className="tablePrestador__tbody-td">
                 {`${d.especialidad?.descripcion}`}
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
                  {`${d.direccion.calle} ${d.direccion.nro}`}
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
                  <Link onClick={() => handleClick(d.agendaId)}>
                    <DeleteIcon></DeleteIcon>
                  </Link>
                  <Link to={`/agenda/modificar/${d.agendaId}`}>
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
