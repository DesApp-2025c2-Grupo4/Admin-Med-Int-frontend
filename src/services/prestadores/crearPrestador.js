const URL_API = import.meta.env.VITE_URL_API;

export async function crearPrestador(bodyToSend) {
    console.log(bodyToSend)
    const res = await fetch(`${URL_API}/prestador`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyToSend)
    });

    if (!res.ok) {
        const data = await res.json()
        return data
    }

    const prestadorCreado = await res.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(prestadorCreado);
        }, 1000); 
    });
}
