import "./GestionarAfiliados.css";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { CardGrupo } from "./ui/CardGrupo.jsx";
import { SearchIcon } from "./icons/SearchIcon.jsx";
import { listAfiliados } from "./../../../Mock/listAfiliados.js";

export function GestionarAfiliados() {
  const titulares = listAfiliados?.filter((l) => l.esTitular);
  return (
    <>
      <TitleSection text="Gestión de Afiliados"></TitleSection>
      <section className="section_container box-border">
        <div className="container_search">
          <input
            className="search box-border"
            type="text"
            placeholder="Buscar"
          ></input>
          <select className="container_select box-border">
            <option value="" className="text">
              Filtrar
            </option>
            <option value="credencial">Credencial</option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="grupo">Grupo Familiar</option>
            <option value="fechaNac">Fecha de nacimiento</option>
            <option value="direccion">Dirección</option>
          </select>
          <div className="container_icon_search">
            <SearchIcon></SearchIcon>
          </div>
        </div>
        <section className="section_cards">
          {titulares.map((a) => (
            <CardGrupo
              key={a.personaId}
              credencial={a.personaId}
              nombre={a.nombre}
              apellido={a.apellido}
              fechaAlta={a.fechaAlta}
              planMedico={a.planMedico.descripcion}
            ></CardGrupo>
          ))}
        </section>
      </section>
    </>
  );
}
