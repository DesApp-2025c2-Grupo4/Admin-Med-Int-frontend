const URL_API = import.meta.env.VITE_URL_API;

export const agregarUnaDireccion = async (direccion, personaId) => {
  direccion.nro = direccion.nro === '' ? null : direccion.nro
  const res = await fetch(`${URL_API}/direcciones/${personaId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(direccion)
  });

  if (!res.ok) throw new Error('Error al enviar direccion');

  const nuevoDireccion = await res.json();
  return nuevoDireccion;
};
