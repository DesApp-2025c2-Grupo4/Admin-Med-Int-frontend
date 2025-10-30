import { useState, useEffect } from "react";
import { useGetAgenda } from "../../../hooks/useGetAgenda";
import { useGetAllPrestadores } from "../../../hooks/useGetAllPrestadores";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo";
import { TitleSection } from "../../../components/TitleSections/TitleSection";
import { SearchIcon } from "../../../assets/icons/Afiliados/SearchIcon";
import { TableAgenda } from "./TableAgenda";
import { headerTableAgenda } from "./../../../constants/Agenda/headerTableAgenda";
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection";
import { LoaderConTexto } from "../../../components/LoaderConTexto/LoaderConTexto";

export function GestionarAgenda() {
  const { loadingAgenda, agenda } = useGetAgenda();
  const { loadingPrestadores, prestadores } = useGetAllPrestadores();
  const [fullAgenda, setFullAgenda] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");

  useCambiarTitulo({ title: "Gestión de Agenda" });

  useEffect(() => {
    if (agenda && prestadores) {
      const agendaConPrestador = agenda.map((a) => {
        const prestador = prestadores.find(
          (p) => p.prestadorId === a.prestadorId
        );
        return { ...a, prestador };
      });

      setFullAgenda(agendaConPrestador);
    }
  }, [agenda, prestadores]);

  const filtrar = () => {
    if (!busqueda || !filtro) {
      const agendaConPrestador = agenda.map((a) => {
        const prestador = prestadores.find(
          (p) => p.prestadorId === a.prestadorId
        );
        return { ...a, prestador };
      });
      setFullAgenda(agendaConPrestador);
      return;
    }

    const busq = busqueda.toLowerCase();

    let resultado = [];

    switch (filtro) {
      case "nombre":
        resultado = fullAgenda.filter((a) =>
          a.prestador?.nombre?.toLowerCase().includes(busq)
        );
        break;

      case "apellido":
        resultado = fullAgenda.filter((a) =>
          a.prestador?.apellido?.toLowerCase().includes(busq)
        );
        break;

      case "especialidad":
        resultado = fullAgenda.filter((a) =>
          a.prestador?.especialidad?.some((e) =>
            e.descripcion?.toLowerCase().includes(busq)
          )
        );
        break;

      case "lugarDeAtención":
        resultado = fullAgenda.filter((a) =>
          a.prestador?.direccion?.some((d) =>
            d.calle?.toLowerCase().includes(busq)
          )
        );
        break;

      case "todos":
        resultado = agenda.map((a) => {
          const prestador = prestadores.find(
            (p) => p.prestadorId === a.prestadorId
          );
          return { ...a, prestador };
        });
        break;

      default:
        resultado = fullAgenda;
    }

    setFullAgenda(resultado);
  };

  return (
    <>
      <section className="section_container box-border">
        <TitleSection text="Gestión de Agenda" />
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
            <option value="nombre" className="option_gestionar">
              Nombre
            </option>
            <option value="apellido" className="option_gestionar">
              Apellido
            </option>
            <option value="especialidad" className="option_gestionar">
              Especialidad
            </option>
            <option value="lugarDeAtención" className="option_gestionar">
              Lugar De Atención
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
        <section className="section-tabla-agenda">
          {loadingPrestadores && loadingAgenda ? (
            <div className="centrar">
              <LoaderConTexto />
            </div>
          ) : fullAgenda && fullAgenda.length > 0 ? (
            <TableAgenda listHeader={headerTableAgenda} data={fullAgenda} />
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
