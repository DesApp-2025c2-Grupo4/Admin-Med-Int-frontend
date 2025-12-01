const URL_API = import.meta.env.VITE_URL_API;

export const getPrestadoresPorCodigoPostal = async (codigoPostal) => {
  const res = await fetch(`${URL_API}/prestador/por-codigo-postal/${codigoPostal}`);
  const data = await res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
