const URL_API = import.meta.env.VITE_URL_API;

export const editarUnTelefono = async(telefonoId,body)=>{
  const res = await fetch(`${URL_API}/telefonos/${telefonoId}`,{
    method:'PUT',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  })

  if(!res) throw new Error('Error al editar telefono')
  
  const telefonoEliminado = await res.json()

  return telefonoEliminado
}