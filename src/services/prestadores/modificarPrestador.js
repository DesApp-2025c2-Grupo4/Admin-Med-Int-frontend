const URL_API = import.meta.env.VITE_URL_API;

const formatoParaAPI = (dataForm, tipoPrestador) => {
    const [nombre, ...apellidosArray] = dataForm.nombreCompleto.trim().split(' ').filter(n => n);
    const apellido = apellidosArray.join(' ');

    const mapaEspecialidades = {
        medicinaGeneral: "Medicina General",
        psicologia: "Psicología",
        nutricion: "Nutrición",
        neurologia: "Neurología",
        oftalmologia: "Oftalmología",
        urologia: "Urología",
        cardiologia: "Cardiología",
        ginecologia: "Ginecología",
        kinesiologia: "Kinesiología",
        pediatria: "Pediatría",
        traumatologia: "Traumatología",
        oncologia: "Oncología",
        psiquiatria: "Psiquiatría"
    };

    const especialidades = Object.keys(dataForm)
        .filter(key => dataForm[key] === true && mapaEspecialidades[key])
        .map(key => ({ descripcion: mapaEspecialidades[key] }));

    return {
        cuilCuit: dataForm.cuilCuit,
        nombre: nombre,
        apellido: apellido,
        tipoPrestador: tipoPrestador.charAt(0).toUpperCase() + tipoPrestador.slice(1),
        lugarIndependiente: tipoPrestador === "independiente" ? dataForm.lugarIndependiente : null,
        lugarCentro: tipoPrestador === "centro" ? dataForm.lugarCentro : null,
        emails: dataForm.emails.map(e => ({ descripcion: e })),
        telefonos: dataForm.telefonos.map(t => ({ nroTelefono: t })),
        direcciones: dataForm.direcciones.map(d => typeof d === 'string' ? d : `${d.calle} ${d.nro}`),
        especialidad: especialidades
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
