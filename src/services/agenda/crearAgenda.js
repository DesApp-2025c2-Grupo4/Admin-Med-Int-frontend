const URL_API = import.meta.env.VITE_URL_API;
export const crearAgenda = async (dataForm) => {

  const dataAgenda = crearObjetoAgenda(dataForm);

  const resAgenda = await fetch(`${URL_API}/agenda`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataAgenda),
  });

  if (!resAgenda.ok) throw new Error(`Error en la solicitud: ${resAgenda}`);

  const agenda = await resAgenda.json();
  return { agenda };
};


function crearObjetoAgenda(dataForm) {
  return {
    prestadorId: dataForm.prestadorId,
    especialidadId: dataForm.especialidadId,
    direccionId: dataForm.direccionId,
    agendas: dataForm.agendas,
  };
}
