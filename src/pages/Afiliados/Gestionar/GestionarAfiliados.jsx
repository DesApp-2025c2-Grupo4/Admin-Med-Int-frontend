import "./GestionarAfiliados.css";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { CardGrupo } from "./ui/CardGrupo.jsx";
import { SearchIcon } from "./icons/SearchIcon.jsx";
import { listGrupos } from "./../../../Mock/listGrupos.js";

export function GestionarAfiliados() {
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
          {listGrupos?.map((grupo) => (
            <CardGrupo
              key={grupo.idGrupo}
              credencial={grupo.nroGrupo}
              nombre={grupo.integrantes.find((i) => i.esTitular)?.nombre}
              apellido={grupo.integrantes.find((i) => i.esTitular)?.apellido}
              fechaAlta={grupo.fechaAlta}
              planMedico={grupo.planMedico.descripcion}
              integrantes={grupo.integrantes}
            />
          )) || []}
        </section>
      </section>
    </>
  );
}
