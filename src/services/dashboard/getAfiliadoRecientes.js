import { listAfiliados } from "../../Mock/listAfiliados"
export const getAfiliadoRecientes = async()=>{
  //Despues reemplazar por la logica
  const afiliadosOrdenados = listAfiliados.sort((a, b) => {
    return new Date(b.fechaAlta) - new Date(a.fechaAlta);
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(afiliadosOrdenados.slice(0, 5)); // simula respuesta del backend
    }, 7000);
  });
}