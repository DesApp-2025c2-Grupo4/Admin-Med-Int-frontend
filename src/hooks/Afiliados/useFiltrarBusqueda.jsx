import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
export function useFiltrarBusqueda(credencial, grupos) {
  const [allGrupos, setAllGrupos] = useState(grupos ?? []);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();
  const filtrar = () => {
    if (!busqueda && !filtro) {
      setAllGrupos(grupos);
      return;
    }
    navigate("/afiliados/gestionar/1");
    const texto = busqueda.toLowerCase();
    let resultado = [];

    switch (filtro) {
      case "credencial":
        resultado = grupos
          .filter((g) =>
            g.integrantes.some(
              (i) =>
                i.credencial &&
                i.credencial.toString().toLowerCase().includes(texto)
            )
          )
          .map((g) => ({
            ...g,
            integrantes: g.integrantes.map((i) => ({
              ...i,
              esElBuscado:
                i.credencial &&
                i.credencial.toString().toLowerCase().includes(texto),
            })),
          }));
        break;

      case "activos":
        resultado = grupos.filter((g) => Number(g.esActivo) === 1);
        break;

      case "inactivos":
        resultado = grupos.filter((g) => g.esActivo === -1);
        break;

      case "pendientes":
        resultado = grupos.filter((g) => g.esActivo === 0);
        break;

      case "nombre":
        resultado = grupos
          .filter((g) =>
            g.integrantes.some((i) => i.nombre?.toLowerCase().includes(texto))
          )
          .map((g) => ({
            ...g,
            integrantes: g.integrantes.map((i) => ({
              ...i,
              esElBuscado: i.nombre?.toLowerCase().includes(texto),
            })),
          }));
        break;

      case "apellido":
        resultado = grupos
          .filter((g) =>
            g.integrantes.some((i) => i.apellido?.toLowerCase().includes(texto))
          )
          .map((g) => ({
            ...g,
            integrantes: g.integrantes.map((i) =>
              i.apellido?.toLowerCase().includes(texto)
                ? { ...i, esElBuscado: true }
                : i
            ),
          }));
        break;

      case "grupofamiliar":
        resultado = grupos.filter((g) =>
          g.nroGrupo.toString().includes(busqueda)
        );
        break;

      case "fechaNac":
        resultado = grupos
          .filter((g) =>
            g.integrantes.some((i) => i.fechaNacimiento?.includes(busqueda))
          )
          .map((g) => ({
            ...g,
            integrantes: g.integrantes.map((i) => ({
              ...i,
              esElBuscado: i.fechaNacimiento?.toLowerCase().includes(texto),
            })),
          }));
        break;

      case "direccion":
        resultado = grupos
          .filter((g) =>
            g.integrantes.some((i) =>
              i.direcciones.some((d) => d.calle.toLowerCase().includes(texto))
            )
          )
          .map((g) => ({
            ...g,
            integrantes: g.integrantes.map((i) => ({
              ...i,
              esElBuscado: i.direcciones.some((d) =>
                d.calle.toLowerCase().includes(texto)
              ),
            })),
          }));;
        break;

      case "todos":
      default:
        resultado = grupos;
    }

    setAllGrupos(resultado);
  };

  // Actualiza los grupos cuando cambian los datos originales
  useEffect(() => {
    setAllGrupos(grupos ?? []);
  }, [grupos]);

  // Si se recibe una credencial desde afuera, autocompleta búsqueda y filtro
  useEffect(() => {
    if (credencial) {
      setBusqueda(credencial.toString());
      setFiltro("credencial");
    }
  }, [credencial]);

  return {
    busqueda,
    setBusqueda,
    allGrupos,
    setAllGrupos,
    filtrar,
    setFiltro,
    filtro,
  };
}
