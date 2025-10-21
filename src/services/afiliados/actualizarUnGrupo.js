const URL_API = import.meta.env.VITE_URL_API;

export async function actualizarUnGrupo(id,body){
  const res = await fetch(`${URL_API}/grupo/${id}`,{
    method:'PUT',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  })
  if(!res.ok) throw new Error('Error al actualizar')
  const data = await res.json()

  return data
}