import { listPrestador } from "../../Mock/listPrestadores";

export const getPrestadores = async ()=>{
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listPrestador); // simula respuesta del backend
      }, 1000);
    });
}
