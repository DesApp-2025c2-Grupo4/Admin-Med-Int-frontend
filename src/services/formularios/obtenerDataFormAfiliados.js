const URL_API = import.meta.env.VITE_URL_API;
export async function obtenerDataFormAfiliados(){
  //Consulta
  const res = await fetch(`${URL_API}/data-form`)
  //En caso de error
  if(!res.ok) throw new Error('Error al obtener los datos')
  //Que salga todo bien
  const data = await res.json()
  console.log(data)
  //Retorno
  return data
}