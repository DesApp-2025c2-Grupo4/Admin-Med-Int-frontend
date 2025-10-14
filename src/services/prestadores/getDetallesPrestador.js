import { listPrestador } from "../../Mock/listPrestadores.js";

export function getDetalleDePrestador(id) {
  console.log(listPrestador)
  return new Promise((resolve) => {
    setTimeout(() => {
      const prestador = listPrestador.find(
        (p) => p.prestadorId === Number(id)
      );

      if (prestador) {
        resolve(prestador);
      } else {
        resolve(null);
      }
    }, 3000); 
  });
}