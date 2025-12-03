const URL_API = import.meta.env.VITE_URL_API;

export const getPrestadoresSinAgenda = async () => {
  const res = await fetch(`${URL_API}/prestador/sin-agenda`);
  const data = await res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};