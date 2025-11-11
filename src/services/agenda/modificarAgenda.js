const URL_API = import.meta.env.VITE_URL_API;

export async function modificarAgenda(id, data) {
  const res = await fetch(`${URL_API}/agenda/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al modificar la agenda");
  return await res.json();
}