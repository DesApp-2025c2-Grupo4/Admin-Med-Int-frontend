const URL_API = import.meta.env.VITE_URL_API;

export const getAfiliadosPorPeriodo = async (fechaDesde, fechaHasta) => {
  const res = await fetch(`${URL_API}/persona/afiliados/por-periodo?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`)
  const data = await res.json()
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data); 
    }, 1000);
  });
}