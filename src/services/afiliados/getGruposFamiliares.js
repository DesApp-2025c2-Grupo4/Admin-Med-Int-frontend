const URL_API = import.meta.env.VITE_URL_API;
export const getGruposFamiliares = async ()=>{
  const res = await fetch(`${URL_API}/grupo`)
  const data = await res.json()
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data); // simula respuesta del backend
      }, 1000);
    });
}
