import "./GestionarAfiliados.css";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { CardGrupo } from "./ui/CardGrupo.jsx";
import { SearchIcon } from "../../../assets/icons/Afiliados/SearchIcon.jsx";
import { Loader } from "../../../components/Loader/Loader.jsx";
import { useState, useEffect } from "react";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { useGetAllGrupos } from "../../../hooks/useGetAllGrupos.jsx";
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection.jsx";

export function GestionarAfiliados() {
  const { loadingGrupos, grupos } = useGetAllGrupos();
  const [allGrupos, setAllGrupos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");
  useCambiarTitulo({ title: "Gestión de Afiliados" });

  useEffect(() => {
    if (grupos) {
      setAllGrupos(grupos);
    }
  }, [grupos]);

  const filtrar = () => {
    if (!busqueda || !filtro) {
      // si no hay búsqueda o filtro, muestro todos los grupos
      setAllGrupos(grupos);
      return;
    }

    let resultado = [];

    switch (filtro) {
      case "credencial":
        resultado = grupos.filter((g) =>
          g.integrantes.some(
            (i) =>
              i.credencial &&
              i.credencial.toString().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "nombre":
        resultado = grupos.filter((g) =>
          g.integrantes.some(
            (i) =>
              i.nombre &&
              i.nombre.toLowerCase().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "apellido":
        resultado = grupos.filter((g) =>
          g.integrantes.some(
            (i) =>
              i.apellido &&
              i.apellido.toLowerCase().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "grupo":
        resultado = grupos.filter((g) =>
          g.nroGrupo.toString().includes(busqueda)
        );
        break;

      case "fechaNac":
        resultado = grupos.filter((g) =>
          g.integrantes.some(
            (i) => i.fechaNacimiento && i.fechaNacimiento.includes(busqueda)
          )
        );
        break;

      case "direccion":
        resultado = grupos.filter(
          (g) =>
            g.direccion &&
            g.direccion.toLowerCase().includes(busqueda.toLowerCase())
        );
        break;
      case "todos":
        resultado = grupos;
        break;

      default:
        resultado = grupos;
    }

    setAllGrupos(resultado);
  };

  return (
    <>
      <section className="section_container box-border">
        <TitleSection text="Gestión de Afiliados"></TitleSection>
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
            <option value="" className="option_gestionar">
              Filtrar
            </option>
            <option value="credencial" className="option_gestionar">
              Credencial
            </option>
            <option value="nombre" className="option_gestionar">
              Nombre
            </option>
            <option value="apellido" className="option_gestionar">
              Apellido
            </option>
            <option value="grupo" className="option_gestionar">
              Grupo Familiar
            </option>
            <option value="fechaNac" className="option_gestionar">
              Fecha de nacimiento
            </option>
            <option value="direccion" className="option_gestionar">
              Dirección
            </option>
            <option value="todos" className="option_gestionar">
              Mostrar todos
            </option>
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
          {loadingGrupos ? (
            <div className="centrar">
              <Loader />
            </div>
          ) : allGrupos && allGrupos.length > 0 ? (
            allGrupos.map((grupo) => (
              <CardGrupo
                key={grupo.idGrupo}
                idGrupo={grupo.idGrupo}
                credencial={grupo.nroGrupo}
                nombre={grupo.integrantes.find((i) => i.esTitular)?.nombre}
                apellido={grupo.integrantes.find((i) => i.esTitular)?.apellido}
                fechaAlta={grupo.fechaAlta}
                planMedico={grupo.planMedico.descripcion}
                integrantes={grupo.integrantes}
                setAllGrupos={setAllGrupos}
              />
            ))
          ) : (
            <div className="sin-resultados-section">
              <SubTitleSection text={"No se encontraron resultados."} />
            </div>
          )}
        </section>
      </section>
    </>
  );
}
