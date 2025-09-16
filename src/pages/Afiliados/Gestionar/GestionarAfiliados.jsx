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
        <SearchIcon></SearchIcon>
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
