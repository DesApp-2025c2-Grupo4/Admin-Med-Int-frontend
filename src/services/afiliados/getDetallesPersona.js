import { listAfiliados } from '../../Mock/listAfiliados.js'
export function getDetalleDePersona(id){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(listAfiliados[0]); // simula respuesta del backend
    }, 7000);
  })
} 