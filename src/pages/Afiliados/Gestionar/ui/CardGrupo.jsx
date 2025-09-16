import { Link } from "react-router";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ModifierIcon } from "../icons/ModifierIcon";
import { UsersIcon } from "../icons/UsersIcon";
import "./CardGrupo.css";

export function CardGrupo({
  credencial,
  nombre,
  apellido,
  fechaAlta,
  planMedico,
}) {
  return (
    <>
      <section className="card_container box-border">
        <section className="body-cardGrupo">
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
        </section>
      </section>
    </>
  );
}
