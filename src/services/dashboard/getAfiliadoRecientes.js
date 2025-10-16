const URL_API = import.meta.env.VITE_URL_API;
export const getAfiliadoRecientes = async () => {
  const res = await fetch(`${URL_API}/persona`)
  const data = await res.json()
  //Despues reemplazar por la logica
  const afiliadosOrdenados = data.sort((a, b) => {
    return new Date(b.fechaAlta) - new Date(a.fechaAlta);
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(afiliadosOrdenados.slice(0, 5)); // simula respuesta del backend
    }, 7000);
  });
}