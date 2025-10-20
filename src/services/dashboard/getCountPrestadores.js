const URL_API = import.meta.env.VITE_URL_API;
export const getCountPrestadores = async () => {
  const res = await fetch(`${URL_API}/prestador`);
  const data = await res.json();
  const size = Object.keys(data).length;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(size); // simula respuesta del backend
    }, 1000);
  });
};