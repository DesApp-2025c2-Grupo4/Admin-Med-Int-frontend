import { listAfiliados } from "../../Mock/listAfiliados"
export const getAfiliadoRecientes = async()=>{
  //Despues reemplazar por la logica
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listAfiliados.slice(0, 5)); // simula respuesta del backend
    }, 10000);
  });
}