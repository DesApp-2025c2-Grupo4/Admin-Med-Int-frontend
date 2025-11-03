const URL_API = import.meta.env.VITE_URL_API;

export async function crearPrestador(bodyToSend) {
    const res = await fetch(`${URL_API}/prestador`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend)
    });

    if (!res.ok) {
        let errorMsg;
        try {
            const errorData = await res.json();
            errorMsg = errorData.error || errorData.message || res.statusText;
        } catch (e) {
            errorMsg = res.statusText;
        }
        throw new Error(`Error al crear el prestador: ${errorMsg}`);
    }

    const prestadorCreado = await res.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(prestadorCreado);
        }, 1000); 
    });
}
