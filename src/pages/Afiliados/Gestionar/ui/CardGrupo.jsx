import { Link } from "react-router";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ModifierIcon } from "../icons/ModifierIcon";
import { UsersIcon } from "../icons/UsersIcon";
import "./CardGrupo.css";
import { TableAfiliados } from "../../../Dashboard/Section-2/ui/Table/TableAfiliados";
import { headerTableGrupoFamiliar } from "../../../../constants/Afiliados/Gestionar/headerTableGrupoFamiliar";
import { useGetAfiliadosRecientes } from "../../../../hooks/useGetAfiliadosRecientes";

export function CardGrupo({
  credencial,
  nombre,
  apellido,
  fechaAlta,
  planMedico,
}) {
  
  const {loadingAfiliados,afiliadosRecientes} = useGetAfiliadosRecientes()
  return (
    <>
      <section className="card_container box-border">
        <div className="container_data">
          <h1 className="titleGrupo">
            Grupo Familiar {credencial} | {nombre} {apellido}
          </h1>
          <p className="descriptionGrupo">
            Plan: {planMedico} | Fecha Alta: {fechaAlta}
          </p>
        </div>
        <div className="container_icons">
          <Link>
            <DeleteIcon></DeleteIcon>
          </Link>
          <Link>
            <UsersIcon></UsersIcon>
          </Link>
          <Link>
            <ModifierIcon></ModifierIcon>
          </Link>
        </div>
        {/*<table>
          <thead className="table__thead-container">
            <tr className="table__thead-tr">
              <th>
                hola
              </th>
            </tr>
          </thead>
        </table>*/}
        <TableAfiliados loadingAfiliados={loadingAfiliados}
                listHeader={headerTableGrupoFamiliar}
                data={afiliadosRecientes}></TableAfiliados>
      </section>
    </>
  );
}
