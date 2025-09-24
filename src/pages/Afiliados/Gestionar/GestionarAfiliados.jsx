import "./GestionarAfiliados.css";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { CardGrupo } from "./ui/CardGrupo.jsx";
import { SearchIcon } from "./icons/SearchIcon.jsx";
import { listGrupos } from "./../../../Mock/listGrupos.js";
import { useState } from "react";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";

export function GestionarAfiliados() {
  const [allGrupos, setAllGrupos] = useState(listGrupos);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");
  
  useCambiarTitulo({ title: 'Gestión de Afiliados' })

  const filtrar = () => {
    if (!busqueda || !filtro) {
      // si no hay búsqueda o filtro, muestro todos los grupos
      setAllGrupos(listGrupos);
      return;
    }

    let resultado = [];

    switch (filtro) {
      case "credencial":
        resultado = listGrupos.filter((g) =>
          g.integrantes.some(
            (i) =>
              i.credencial &&
              i.credencial.toString().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "nombre":
        resultado = listGrupos.filter((g) =>
          g.integrantes.some(
            (i) =>
              i.nombre &&
              i.nombre.toLowerCase().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "apellido":
        resultado = listGrupos.filter((g) =>
          g.integrantes.some(
            (i) =>
              i.apellido &&
              i.apellido.toLowerCase().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "grupo":
        resultado = listGrupos.filter((g) =>
          g.nroGrupo.toString().includes(busqueda)
        );
        break;

      case "fechaNac":
        resultado = listGrupos.filter((g) =>
          g.integrantes.some(
            (i) => i.fechaNacimiento && i.fechaNacimiento.includes(busqueda)
          )
        );
        break;

      case "direccion":
        resultado = listGrupos.filter(
          (g) =>
            g.direccion &&
            g.direccion.toLowerCase().includes(busqueda.toLowerCase())
        );
        break;

      default:
        resultado = listGrupos;
    }

    setAllGrupos(resultado);
  };

  return (
    <>
      <TitleSection text="Gestión de Afiliados"></TitleSection>
      <section className="section_container box-border">
        <div className="container_search">
          <input
            className="search box-border"
            type="text"
            placeholder="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          ></input>
          <select
            className="container_select box-border"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
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
          <div
            className="container_icon_search"
            onClick={filtrar}
            title={"Buscar"}
          >
            <SearchIcon></SearchIcon>
          </div>
        </div>
        <section className="section_cards">
          {allGrupos?.map((grupo) => (
            <CardGrupo
              key={grupo.idGrupo}
              credencial={grupo.nroGrupo}
              nombre={grupo.integrantes.find((i) => i.esTitular)?.nombre}
              apellido={grupo.integrantes.find((i) => i.esTitular)?.apellido}
              fechaAlta={grupo.fechaAlta}
              planMedico={grupo.planMedico.descripcion}
              integrantes={grupo.integrantes}
              setAllGrupos={setAllGrupos}
              idGrupo = {grupo.idGrupo}
            />
          )) || []}
        </section>
      </section>
    </>
  );
}
