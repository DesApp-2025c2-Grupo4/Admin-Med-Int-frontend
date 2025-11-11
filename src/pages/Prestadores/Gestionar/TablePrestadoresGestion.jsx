import "./TablePrestadoresGestion.css";
import { Link } from "react-router";
import { DeleteIcon } from "../../../assets/icons/Afiliados/DeleteIcon";
import { DetailsIcon } from "../../../assets/icons/Afiliados/DetailsIcon";
import { ModifierIcon } from "../../../assets/icons/Afiliados/ModifierIcon";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState, useEffect } from "react";
import { ModalDeConfirmacion } from "../../../components/ModalDeConfirmacion/ModalDeConfirmacion";
import { useEliminarUnPrestador } from "../../../hooks/Prestador/useEliminarUnPrestador";
export function TablePrestadoresGestion({ listHeader, data }) {

  //estados de prestadores
  const [prestadores, setPrestadores] = useState(data);
  //Estado de modal
  const [showModal, setShowModal] = useState(false);
  //Estado del prestador a eliminar
  const [idPrestador, setIdPrestador] = useState();
  //Llamada al hook
  const { error, loading, eliminarPrestador } =
    useEliminarUnPrestador(setPrestadores);
  //Renderizado de la tabla
  useEffect(() => {
    setPrestadores(data);
  }, [data]);

  //Funcion de eliminar
  const handleEliminarPrestador = () => {
    setShowModal(false);
    eliminarPrestador(idPrestador);
    setIdPrestador(null);
  };
  //HandleClick
  const handleClick = (id) => {
    setShowModal(true);
    setIdPrestador(id);
  };
  //Retorno
  return (
    <div className="tablePrestador__container">
      {/* Modal para confirmar eliminacion */}
      {showModal && (
        <ModalDeConfirmacion
          text={"¿Seguro que deseas eliminar?"}
          funcionCancelar={() => setShowModal(false)}
          funcionConfirmar={handleEliminarPrestador}
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
          {prestadores?.map((d) => {
            return (
              <tr
                className="tablePrestador__tbody-tr"
                key={d.prestadorId}
                style={{ position: "relative" }}
              >
                <td className="tablePrestador__tbody-td">{d.cuilCuit}</td>
                <td className="tablePrestador__tbody-td">{d.apellido ? (`${d.nombre} ${d.apellido}`) : (`${d.nombre}`)}</td>
                <td className="tablePrestador__tbody-td">
                  {d.direccion?.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-direccion-${d.prestadorId}`}
                        data-tooltip-content={d.direccion
                          .map((dir) => `cp: ${dir.codigoPostal}`)
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        {`${d.direccion[0].codigoPostal}...`}
                      </span>

                      <Tooltip
                        id={`tooltip-direccion-${d.prestadorId}`}
                        place="top"
                        style={{
                          background: "#255d99ff",
                        }}
                      />
                    </>
                  ) : (
                    <span>{`${d.direccion[0]?.codigoPostal}`}</span>
                  )}
                </td>
                <td className="tablePrestador__tbody-td">
                  {d.especialidad.length > 1 ? (
                    <>
                      <span
                        data-tooltip-id={`tooltip-${d.prestadorId}`}
                        data-tooltip-content={d.especialidad
                          .map((e) => e.descripcion)
                          .join(",\n")}
                        className="cursor-help text-blue-600 font-medium"
                      >
                        {d.especialidad[0].descripcion}...
                      </span>
                      <Tooltip
                        id={`tooltip-${d.prestadorId}`}
                        place="top"
                        style={{
                          background: "#255d99ff",
                          whiteSpace: "pre-line",
                        }}
                      />
                    </>
                  ) : (
                    <span>{d.especialidad[0]?.descripcion}</span>
                  )}
                </td>
                <td className="tablePrestador__tbody-td">
                  <span className="resaltar">{d.tipoPrestador}</span>
                </td>
                <td id="icons" className="tablePrestador__tbody-td sinBorde">
                  <Link to={`detalle/${d.prestadorId}`}>
                    <DetailsIcon></DetailsIcon>
                  </Link>
                  <Link onClick={() => handleClick(d.prestadorId)}>
                    <DeleteIcon></DeleteIcon>
                  </Link>
                  <Link
                    to={`/prestadores/modificar-prestador/${d.prestadorId}`}
                  >
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
