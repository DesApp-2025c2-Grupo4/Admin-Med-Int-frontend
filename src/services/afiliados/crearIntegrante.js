import { crearObjetoPersona } from "./crearGrupo";
const URL_API = import.meta.env.VITE_URL_API;

export async function crearIntegrante(data){
  //Formateo correctamente persona
  const objetoPersonaFormateado = crearObjetoPersona(data, data.idGrupo)
  console.log("formateado", objetoPersonaFormateado)
  //Hago la peticion
  const res = await fetch(`${URL_API}/persona`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(objetoPersonaFormateado)
  })
  
  //En caso de que falle
  if(!res.ok) throw new Error('Error al crear persona')
  
  //Si sale todo bien

  const integrante = await res.json()
  console.log(integrante)

  return integrante
}