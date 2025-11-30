const URL_API = import.meta.env.VITE_URL_API;

export const getPrestadoresPorEspecialidad = async (especialidadId) => {
  const res = await fetch(`${URL_API}/prestador/por-especialidad/${especialidadId}`);
  const data = await res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};