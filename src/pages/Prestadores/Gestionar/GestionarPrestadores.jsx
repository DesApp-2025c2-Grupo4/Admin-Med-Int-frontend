import { useCambiarTitulo } from "../../../hooks/useCambiarTitulo";
import { TitleSection } from "../../../components/TitleSections/TitleSection";
import { SearchIcon } from "../../../assets/icons/Afiliados/SearchIcon";
import { useGetAllPrestadores } from "../../../hooks/useGetAllPrestadores";
import { useState, useEffect } from "react";
import { headerTablePrestadores } from "./../../../constants/Prestadores/headerTablePrestadoresGestión";
import { TablePrestadoresGestion } from "./TablePrestadoresGestion";

export function GestionarPrestadores() {
  const { loadingPrestadores, prestadores } = useGetAllPrestadores();
  const [allPrestadores, setAllPrestadores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");

  useCambiarTitulo({ title: "Gestión de Prestadores" });

  useEffect(() => {
    if (prestadores) {
      setAllPrestadores(prestadores);
    }
  }, [prestadores]);

  const filtrar = () => {
    if (!busqueda || !filtro) {
      setAllPrestadores(prestadores);
      return;
    }

    let resultado = [];

    switch (filtro) {
      case "cuit/cuil":
        resultado = prestadores.filter((p) =>
          p.cuilCuit.toString().includes(busqueda)
        );
        break;

      case "nombre":
        resultado = prestadores.filter((p) =>
          p.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        break;

      case "apellido":
        resultado = prestadores.filter((p) =>
          p.apellido.toLowerCase().includes(busqueda.toLowerCase())
        );
        break;

      case "especialidad":
        resultado = prestadores.filter((p) =>
          p.especialidad.some(
            (e) =>
              e.descripcion &&
              e.descripcion.toLowerCase().includes(busqueda.toLowerCase())
          )
        );
        break;

      case "tipo":
        resultado = prestadores.filter((p) =>
          p.tipoPrestador.toLowerCase().includes(busqueda.toLowerCase())
        );
        break;

      /* case "codigoPostal":
        resultado = prestadores.filter(
          (p) =>
            p.codigoPostal.toString().includes(busqueda)
        );
        break; */
      case "todos":
        resultado = prestadores;
        break;

      default:
        resultado = prestadores;
    }

    setAllPrestadores(resultado);
  };

  return (
    <>
      <section className="section_container box-border">
        <TitleSection text="Gestión de Prestadores"></TitleSection>
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
            <option value="cuit/cuil" className="option_gestionar">
              CUIT/CUIL
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
            <option value="tipo" className="option_gestionar">
              Tipo de Prestador
            </option>
            <option value="codigoPostal" className="option_gestionar">
              Código postal
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
        <section className="section-tabla-prestadores">
          <TablePrestadoresGestion
            listHeader={headerTablePrestadores}
            data={prestadores}
            loadingPrestadores={loadingPrestadores}
          ></TablePrestadoresGestion>
        </section>
      </section>
    </>
  );
}
