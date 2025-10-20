const URL_API = import.meta.env.VITE_URL_API;
export const getPrestadoresRecientes = async () => {
  const res = await fetch(`${URL_API}/prestador`);
  const data = await res.json();
  const prestadoresOrdenados = data.sort((a, b) => {
    return new Date(b.fechaAlta) - new Date(a.fechaAlta);
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prestadoresOrdenados.slice(0, 5)); 
    }, 1000);
  });
};
