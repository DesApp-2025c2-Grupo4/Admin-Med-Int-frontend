import { listAgenda } from "../../Mock/listAgenda";

export const getAgenda = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listAgenda); // simula respuesta del backend
    }, 1000);
  });
};
