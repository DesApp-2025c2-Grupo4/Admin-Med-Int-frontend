export const eliminarUnIntegrante = async (id) => {
  return new Promise((resolve) => {
      setTimeout(() => {
      resolve(true); // simula respuesta del backend
    }, 3000);
  });
}
