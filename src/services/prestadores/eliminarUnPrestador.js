const URL_API = import.meta.env.VITE_URL_API;
export const eliminarUnPrestador = async (id) => {
  const res = await fetch(`${URL_API}/prestador/${id}`, {
    method:'DELETE'
  });

  if (!res.ok) throw new Error('Error al eliminar el prestador');

  const data = await res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
