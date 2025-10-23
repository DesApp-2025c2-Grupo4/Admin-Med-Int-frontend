const URL_API = import.meta.env.VITE_URL_API;

export const eliminarUnEmail = async (emailId) => {
  const res = await fetch(`${URL_API}/emails/${emailId}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error('Error al eliminar email');

  const emailEliminado = await res.json();
  return emailEliminado;
};
