const URL_API = import.meta.env.VITE_URL_API;
export async function getDetalleDePersona(id) {
  const res = await fetch(`${URL_API}/persona/${id}`)
  const data = await res.json()
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
