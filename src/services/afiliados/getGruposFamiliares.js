import { listGrupos } from "../../Mock/listGrupos";

export const getGruposFamiliares = async ()=>{
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(listGrupos); // simula respuesta del backend
      }, 3000);
    });
}
