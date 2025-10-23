const URL_API = import.meta.env.VITE_URL_API;

export const eliminarUnTelefono = async(telefonoId)=>{
  const res = await fetch(`${URL_API}/telefonos/${telefonoId}`,{
    method:'DELETE'
  })

  if(!res) throw new Error('Error al eliminar telefono')
  
  const telefonoEliminado = await res.json()

  return telefonoEliminado
}