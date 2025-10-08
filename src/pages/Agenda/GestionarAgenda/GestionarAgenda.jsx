import { useState, useEffect } from "react";
import { useGetAgenda } from "../../../hooks/useGetAgenda";
import { useGetAllPrestadores } from "../../../hooks/useGetAllPrestadores";
import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo";
import { TitleSection } from "../../../components/TitleSections/TitleSection";
import { SearchIcon } from "../../../assets/icons/Afiliados/SearchIcon";
import { TableAgenda } from "./TableAgenda";
import { headerTableAgenda } from "./../../../constants/Agenda/headerTableAgenda";

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

    const resultado = fullAgenda.filter((a) => {
      const p = a.prestador || {};

      switch (filtro) {
        case "nombre":
          return p.nombre?.toLowerCase().includes(busq);
        case "apellido":
          return p.apellido?.toLowerCase().includes(busq);
        case "especialidad":
          return p.especialidad?.some((e) =>
            e.descripcion?.toLowerCase().includes(busq)
          );
        case "lugarDeAtención":
          return p.direccion?.some((d) =>
            d.calle?.toLowerCase().includes(busq)
          );
        default:
          return fullAgenda;
      }
    });

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
        <div>
          <TableAgenda listHeader={headerTableAgenda} data={fullAgenda} />
        </div>
      </section>
    </>
  );
}
