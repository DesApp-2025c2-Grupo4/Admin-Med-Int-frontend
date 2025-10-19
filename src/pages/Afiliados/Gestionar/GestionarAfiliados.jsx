import "./GestionarAfiliados.css";
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx";
import { CardGrupo } from "./ui/CardGrupo.jsx";
import { SearchIcon } from "../../../assets/icons/Afiliados/SearchIcon.jsx";
import { Loader } from "../../../components/Loader/Loader.jsx";
import { opcionesParaFiltrarBusqueda } from "../../../constants/Afiliados/Gestionar/opcionesParaFiltrarBusqueda.js";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo.jsx";
import { useGetAllGrupos } from "../../../hooks/useGetAllGrupos.jsx";
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { useParams } from "react-router";
import { useFiltrarBusqueda } from "../../../hooks/Afiliados/useFiltrarBusqueda.jsx";
export function GestionarAfiliados() {
  const {credencial} = useParams()
  const { loadingGrupos, grupos } = useGetAllGrupos();

  useCambiarTitulo({ title: "Gestión de Afiliados" });

  //Llamo a hooks 
  const {
    busqueda, 
    setBusqueda, 
    allGrupos, 
    setAllGrupos,
    setFiltro,
    filtrar,
    filtro
  } = useFiltrarBusqueda(credencial,grupos)
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
            {
              opcionesParaFiltrarBusqueda.map((op,i)=>
                <option key={i}value={op.value}>{op.text}</option>
              )
            }
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
                esActivo={grupo.esActivo}
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
