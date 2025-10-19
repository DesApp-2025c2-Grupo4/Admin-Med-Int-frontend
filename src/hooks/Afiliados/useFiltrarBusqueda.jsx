import { useState,useEffect } from "react";
export function useFiltrarBusqueda(credencial,grupos){
  const [allGrupos, setAllGrupos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("");
  const filtrar = () => {
      if (!busqueda && !filtro) {
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
        case "activos":
          resultado = grupos.filter((g)=>Number(g.esActivo) === 1)
          break
        case "inactivos":
          resultado = grupos.filter((g)=>g.esActivo === -1)
          break
        case "pendientes":
          resultado = grupos.filter((g)=>g.esActivo === 0)
          break
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
  useEffect(() => {
      if (grupos) {
        setAllGrupos(grupos);
      }
    }, [grupos]);
  
  
    //Busco en caso de tener credencial
    useEffect(()=>{
      if(credencial){
        setBusqueda(credencial.toString())
        setFiltro('credencial')
      }
    },[credencial])
    useEffect(() => {
      if (busqueda && filtro && grupos?.length > 0) {
        filtrar();
      }
    }, [busqueda, filtro, grupos]);

  return({
    busqueda, 
    setBusqueda, 
    allGrupos, 
    setAllGrupos,
    filtrar,
    setFiltro,
    filtro
  }
  )
}