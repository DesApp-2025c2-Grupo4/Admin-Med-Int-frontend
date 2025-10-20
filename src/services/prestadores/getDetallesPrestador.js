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
    }, 1000); 
  });
}

/* const URL_API = import.meta.env.VITE_URL_API;
export async function getDetalleDePrestador(id) {
  const res = await fetch(`${URL_API}/prestador/${id}`);
  const data = await res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
} */