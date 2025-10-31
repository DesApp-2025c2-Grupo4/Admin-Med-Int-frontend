const URL_API = import.meta.env.VITE_URL_API;

export async function getAgendaById(id) {
  const res = await fetch(`${URL_API}/agenda/${id}`);
  if (!res.ok) throw new Error("Error al obtener la agenda");
  return await res.json();
}