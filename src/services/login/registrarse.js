const URL_API = import.meta.env.VITE_URL_API;

export const registrarse = async(dataForm)=>{
  const res = await fetch(`${URL_API}/register`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(dataForm)
  })
  const data = await res.json()

  return data
}