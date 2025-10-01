import "../ui/TableIntegrantes.css";
import { Loader } from "../../../../components/Loader/Loader";
import { Link } from "react-router";
import { DeleteIcon } from "../../../../assets/icons/Afiliados/DeleteIcon";
import { ModifierIcon } from "../../../../assets/icons/Afiliados/ModifierIcon";
import { DetailsIcon } from "../../../../assets/icons/Afiliados/DetailsIcon";
export function TableIntegrantes({ listHeader, data, loadingGrupos }) {
  /*
    Descripcion: este componente renderiza la tabla de afiliados del dashboard, los estilos son reutilizables para las demas tablas colocando las mismas clases.
    Entrada: 
      -> listHeader: Lista de encabezados para la tabla. Tiene la siguiente estructura
        listHeader: ['encabezado1',...,'encabezadoN']
      -> data: lista de grupos familiares. tiene la siguiente estructura
        data [
            { 
                idGrupo: 1,
                nroGrupo: "0000001",
                planMedico: { planId: 1, descripcion: "Oro" },
                fechaAlta: "2024-08-14",
                integrantes: [
                    // Titular
                    {
                        credencial: "0000001-01",
                        personaId: 1,
                        situacionesTerapeuticas: [
                            {
                                situacionId: 1,
                                descripcion: "Diabetes",
                                esCronica: true,
                                fechaInicio: "2020-01-01",
                                fechaFin: null,
                            },
                        ],
                        direcciones: [{ direccionId: 1, calle: "Calle Falsa", nro: 123 }],
                        telefonos: [{ telefonoId: 1, nroTelefono: "1123456789" }],
                        tipoDocumento: { tipoDocId: 1, descripcion: "DNI" },
                        nombre: "Pedro",
                        apellido: "Gomez",
                        esTitular: true,
                        fechaNacimiento: "1990-08-22",
                        mail: "pedro.gomez@mail.com",
                        fechaAlta: "2024-08-14",
                        fechaBaja: null,
                        parentesco: null,
                        dni: "23444444",
                    },
                    // Familiar
                    {
                        credencial: "0000001-02",
                        personaId: 4,
                        situacionesTerapeuticas: [
                            {
                                situacionId: 3,
                                descripcion: "Asma",
                                esCronica: false,
                                fechaInicio: "2022-02-01",
                                fechaFin: "2022-06-01",
                            },
                        ],
                        direcciones: [{ direccionId: 4, calle: "Belgrano", nro: 789 }],
                        telefonos: [{ telefonoId: 4, nroTelefono: "1156789012" }],
                        tipoDocumento: { tipoDocId: 1, descripcion: "DNI" },
                        nombre: "Carla",
                        apellido: "Martinez",
                        esTitular: false,
                        fechaNacimiento: "1995-07-12",
                        mail: "carla.martinez@mail.com",
                        fechaAlta: "2024-01-15",
                        fechaBaja: null,
                        parentesco: "Esposa",
                        dni: "40233444",
                    },
                ],
            },
        ]
  */
  const integrantes = data?.flatMap((g) => g.integrantes) || [];

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

        {/* Controlamos si esta cargando para centrar loader */}

        <tbody
          className={`tableGrupo__tbody-container ${
            loadingGrupos ? "centrar" : ""
          }`}
        >
          {
            /* Controlamos loader */
            loadingGrupos ? (
              <tr>
                <td collSpan={listHeader.length}>{<Loader />}</td>
              </tr>
            ) : (
              integrantes?.map((i) => {
                return (
                  <tr className="tableGrupo__tbody-tr" key={i.personaId}>
                    <td className="tableGrupo__tbody-td">{i.credencial}</td>
                    <td className="tableGrupo__tbody-td">{`${i.nombre}, ${i.apellido}`}</td>
                    <td className="tableGrupo__tbody-td">{i.dni}</td>
                    <td className="tableGrupo__tbody-td">
                      {i.fechaNacimiento}
                    </td>
                    <td className="tableGrupo__tbody-td">
                      {i.parentesco ? i.parentesco : "TITULAR"}
                    </td>
                    <td id="icons" className="tableGrupo__tbody-td sinBorde">
                      <Link to={'/afiliados/gestionar/detalles/persona/'+i.personaId}>
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
            )
          }
        </tbody>
      </table>
    </div>
  );
}
