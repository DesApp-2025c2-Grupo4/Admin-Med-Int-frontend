const URL_API = import.meta.env.VITE_URL_API;

export async function actualizarUnaPersona(id,persona){
  const res = await fetch(`${URL_API}/persona/${id}`,{
    method:'PUT',
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify(persona)
  })
  //En caso de error
  if(!res.ok) throw new Error ('Error al actualizar')

  //En caso de que salga todo bien jejejeje
  const personaActualizada = await res.json()
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(personaActualizada)
      }, 1000)
    })
}