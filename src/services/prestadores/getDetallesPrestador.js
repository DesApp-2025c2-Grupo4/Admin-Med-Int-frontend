import { listPrestadores } from "../../Mock/listPrestadores.js";

export function getDetalleDePrestador(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prestador = listPrestadores.find(
        (p) => p.prestadorId === Number(id)
      );

      if (prestador) {
        resolve(prestador);
      } else {
        resolve(null);
      }
    }, 700); 
  });
}