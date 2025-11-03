const URL_API = import.meta.env.VITE_URL_API;

export async function obtenerDataFormPrestadores(){
  //Consulta
  const res = await fetch(`${URL_API}/data-form/prestador`)
  //En caso de error
  if(!res.ok) throw new Error('Error al obtener los datos')
  //Que salga todo bien
  const data = await res.json()
  //Retorno
  return data
}