import "./GestionarAfiliados.css";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { CardGrupo } from "./ui/CardGrupo.jsx";
import { SearchIcon } from "../../../assets/icons/Afiliados/SearchIcon.jsx";
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto.jsx';
import { opcionesParaFiltrarBusqueda } from "../../../constants/Afiliados/Gestionar/opcionesParaFiltrarBusqueda.js";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { useGetAllGrupos } from "../../../hooks/useGetAllGrupos.jsx";
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { useParams } from "react-router";
import { useFiltrarBusqueda } from "../../../hooks/Afiliados/useFiltrarBusqueda.jsx";
import { Paginacion } from '../../../components/Paginacion/Paginacion.jsx';
import { useValidarNumeroPagina } from '../../../hooks/paginacion/useValidarNumeroPagina.jsx';
export function GestionarAfiliados() {
  const { page, credencial} = useParams();
  const { loadingGrupos, grupos } = useGetAllGrupos();
  useValidarNumeroPagina(page, grupos?.length, '/afiliados/gestionar/')
  useCambiarTitulo({ title: "Gestión de Afiliados" });

  //Llamo a hooks
  const {
    busqueda,
    setBusqueda,
    allGrupos,
    setAllGrupos,
    setFiltro,
    filtrar,
    filtro,
  } = useFiltrarBusqueda(credencial, grupos,page);
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
            {opcionesParaFiltrarBusqueda.map((op, i) => (
              <option key={i} value={op.value}>
                {op.text}
              </option>
            ))}
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
              <LoaderConTexto />
            </div>
          ) : allGrupos && allGrupos.length > 0 ? (
            allGrupos.slice(page*10-10, page*10).map((g) => (
              <CardGrupo
                key={g.idGrupo}
                idGrupo={g.idGrupo}
                credencial={g.nroGrupo}
                nombre={g.integrantes.find((i) => i.esTitular)?.nombre}
                apellido={g.integrantes.find((i) => i.esTitular)?.apellido}
                fechaAlta={g.fechaAlta}
                planMedico={g.planMedico.descripcion}
                integrantes={g.integrantes}
                setAllGrupos={setAllGrupos}
                esActivo={g.esActivo}
              />
            ))
          ) : (
            <div className="sin-resultados-section">
              <SubTitleSection text={"No se encontraron resultados."} />
            </div>
          )}
        </section>
      </section>
      <Paginacion 
        nroPage={page}
        cantidadElementos={allGrupos.length}
        path={'/afiliados/gestionar/'}
      />
    </>
  );
}
