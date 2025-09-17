export function getDetalleDePersona(id){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id); // simula respuesta del backend
    }, 7000);
  })
} 