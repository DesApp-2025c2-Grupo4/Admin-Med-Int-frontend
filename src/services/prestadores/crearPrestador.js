const URL_API = import.meta.env.VITE_URL_API;

export async function crearPrestador(dataForm, tipoPrestador) {
  const [nombre, ...apellidoParts] = dataForm.nombreCompleto.trim().split(' ');
  const apellido = apellidoParts.join(' ');

  const especialidades = Object.entries(dataForm)
    .filter(([key, value]) => value === true)
    .map(([key]) => key); 

  const body = {
    nombre,
    apellido,
    tipoPrestador,
    cuilCuit: dataForm.cuilCuit,
    fechaAlta: new Date().toISOString(),
    lugarIndependiente: dataForm.lugarIndependiente,
    lugarCentro: dataForm.lugarCentro,
    telefonos: dataForm.telefonos,
    emails: dataForm.emails,
    direcciones: dataForm.direcciones,
    especialidades 
  };

  console.log("Cuerpo a enviar:", body);

  const res = await fetch(`${URL_API}/prestador`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error al crear el prestador: ${errorData.error || res.statusText}`);
  }

  const prestadorCreado = await res.json();
  return prestadorCreado;
}
