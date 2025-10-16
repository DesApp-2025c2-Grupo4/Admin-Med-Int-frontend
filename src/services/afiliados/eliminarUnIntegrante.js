const URL_API = import.meta.env.VITE_URL_API;
export const eliminarUnIntegrante = async (id) => {
  const res = await fetch(`${URL_API}/persona/${id}`,{
    method:'DELETE'
  })

  //En caso de error
  if (!res.ok) throw new Error('Error al eliminar el integrante');

  //Paso a json
  const integranteEliminado = await res.json()

  //Espero un poco
  return new Promise((resolve) => {
    setTimeout(() => resolve(integranteEliminado), 1000);
  });
}
