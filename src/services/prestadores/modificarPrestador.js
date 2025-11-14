const URL_API = import.meta.env.VITE_URL_API;

const formatoParaAPI = (dataForm, tipoPrestador) => {
  const nombreCompletoSeguro = (dataForm?.nombreCompleto || '').trim();
  
  const [nombre, ...apellidosArray] = nombreCompletoSeguro
    .split(' ')
    .filter(n => n);

  const apellido = apellidosArray.join(' ');

  const tipoNormalizado = (tipoPrestador || '') 
        ? (tipoPrestador?.charAt(0).toUpperCase() + tipoPrestador.slice(1)) 
        : '';

  return {
    cuilCuit: dataForm.cuilCuit,
    nombre: nombre,
    apellido: apellido,
    tipoPrestador: tipoNormalizado,
    asociadoDe: tipoPrestador === "independiente" ? (dataForm.asociadoDe || null) : null,
    emails: dataForm.emails.map(e => ({ descripcion: e })),
    telefonos: dataForm.telefonos.map(t => ({ nroTelefono: t })),
    direcciones: dataForm.direcciones,
    especialidades: dataForm.especialidades || []
  };
};

export const updatePrestadorService = async (dataForm, tipoPrestador, prestadorId) => {
  const apiData = formatoParaAPI(dataForm, tipoPrestador);
  const API_URL = `${URL_API}/prestador/${prestadorId}`;

  try {
    const res = await fetch(API_URL, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData),
    });
    
    const result = await res.json();
    
    if (!res.ok) {
      const errorMessage = result.message || 'Error desconocido al actualizar el prestador.';
      const errorDetails = result.details ? ` Detalles: ${result.details}` : '';
      throw new Error(errorMessage + errorDetails);
    }

    return result;
  } catch (error) {
    console.error("Error en updatePrestadorService:", error);
    throw error;
  }
};
