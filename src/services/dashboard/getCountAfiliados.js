const URL_API = import.meta.env.VITE_URL_API;
export const getCountAfiliados = async () => {
  const res = await fetch(`${URL_API}/persona`)
  const data = await res.json()
  const size = Object.keys(data).length
  //Despues reemplazar por la logica
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(size); // simula respuesta del backend
    }, 1000);
  });
};