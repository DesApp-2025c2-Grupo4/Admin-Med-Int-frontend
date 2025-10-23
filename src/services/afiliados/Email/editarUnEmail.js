const URL_API = import.meta.env.VITE_URL_API;

export const editarUnEmail = async (emailId, body) => {
  const res = await fetch(`${URL_API}/emails/${emailId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error('Error al editar email');

  const emailEditado = await res.json();
  return emailEditado;
};
