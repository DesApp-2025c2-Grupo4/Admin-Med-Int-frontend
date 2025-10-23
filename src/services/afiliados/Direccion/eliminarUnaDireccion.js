const URL_API = import.meta.env.VITE_URL_API;

export async function eliminarUnaDireccion(direccionId){
  console.log('Llego')
  const res = await fetch(`${URL_API}/direcciones/${direccionId}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error('Error al eliminar Direccion');

  const direccionEliminada = await res.json();
  return direccionEliminada;
}