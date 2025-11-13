const URL_API = import.meta.env.VITE_URL_API;

export const agregarUnTelefono = async(telefono, personaId)=>{
  const res = await fetch(`${URL_API}/telefonos/${personaId}`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(telefono)
  })

  if(!res) throw new Error('Error al enviar telefono')
  
  const nuevoTelefono = await res.json()

  return nuevoTelefono
}