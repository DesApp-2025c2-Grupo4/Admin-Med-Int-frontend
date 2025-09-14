import { listPrestador } from "../../Mock/listPrestadores";

export const getPrestadoresRecientes = async ()=>{
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listPrestador.slice(0, 5)); // simula respuesta del backend
      }, 8000);
    });
}