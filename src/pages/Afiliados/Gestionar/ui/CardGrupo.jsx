import { Link } from "react-router";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ModifierIcon } from "../icons/ModifierIcon";
import { UsersIcon } from "../icons/UsersIcon";
import "./CardGrupo.css";
import { headerTableGrupoFamiliar } from "../../../../constants/Afiliados/Gestionar/headerTableGrupoFamiliar";
import { TableIntegrantes } from "./TableIntegrantes";
import { useState } from "react";

export function CardGrupo({
  credencial,
  nombre,
  apellido,
  fechaAlta,
  planMedico,
  integrantes,
}) {

  let  [contraer, setContraer] = useState(false) 

  const modificarCard = () => {
    setContraer(!contraer);
  }

  return (
    <>
      <section
        className="card_container box-border"
        style={{ paddingBottom: contraer ? "1rem" : "0" }}
      >
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
          <div onClick={modificarCard} style={{ cursor: "pointer" }}>
            <UsersIcon />
          </div>
          <Link>
            <ModifierIcon></ModifierIcon>
          </Link>
        </div>
        <div
          className={`container_tableIntegrantes ${contraer ? "contraer" : ""}`}
        >
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
