const URL_API = import.meta.env.VITE_URL_API;

export async function editarUnaDireccion(id, data){
  const res = await fetch(`${URL_API}/direcciones/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error('Error al editar Direccion');

  const direccionEditado = await res.json();
  return direccionEditado;
}