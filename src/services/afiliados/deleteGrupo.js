const URL_API = import.meta.env.VITE_URL_API;
export async function deleteGrupo(id){
  //Fetchin
  const res = await fetch(`${URL_API}/grupo/${id}`,{method:'DELETE'})
  //Controlo que esté todo correcto
  if(!res.ok) throw new Error('Error en la solicitud al eliminar un grupo')
  //Transformo la respuesta
  const data = await res.json()

  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
}