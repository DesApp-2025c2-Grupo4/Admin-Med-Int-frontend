import { Link } from "react-router";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ModifierIcon } from "../icons/ModifierIcon";
import { UsersIcon } from "../icons/UsersIcon";
import "./CardGrupo.css";
import { headerTableGrupoFamiliar } from "../../../../constants/Afiliados/Gestionar/headerTableGrupoFamiliar";
import { listGrupos } from "../../../../Mock/listGrupos";
import { TableIntegrantes } from "./TableIntegrantes";

export function CardGrupo({
  credencial,
  nombre,
  apellido,
  fechaAlta,
  planMedico,
  integrantes,
}) {
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
        <div className="container_tableIntegrantes">
          <TableIntegrantes
            loadingGrupos={false}
            listHeader={headerTableGrupoFamiliar}
            data={[{ integrantes }]}
          ></TableIntegrantes>
        </div>
      </section>
    </>
  );
}
