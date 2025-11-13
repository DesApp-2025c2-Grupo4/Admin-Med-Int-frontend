const URL_API = import.meta.env.VITE_URL_API;

export const agregarUnEmail = async (email, personaId) => {

  const res = await fetch(`${URL_API}/emails/${personaId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  });

  if (!res.ok) throw new Error('Error al enviar email');

  const nuevoEmail = await res.json();
  return nuevoEmail;
};
