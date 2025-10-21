const URL_API = import.meta.env.VITE_URL_API;

export async function getGrupoFamiliar(id) {
  //Peticion
  const res = await fetch(`${URL_API}/grupo/${id}`)

  //En caso de error
  if(!res.ok) throw new Error('Error al obtener el grupo')

  //En caso de que salga todo bien
  const data = await res.json() 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}
