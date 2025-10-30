import { useEffect, useState } from "react";
import { getAllAfiliados } from "../../services/afiliados/getAllAfiliados.js";

export function useGetAllAfiliados() {
  const [afiliados, setAfiliados] = useState(null);
  const [loadingAfiliados, setLoadingAfiliados] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAfiliados = async () => {
      try {
        const data = await getAllAfiliados();
        setAfiliados(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener todos los afiliados`);
      } finally {
        setLoadingAfiliados(false);
      }
    };

    fetchAfiliados();

  }, []);

  return( { error, loadingAfiliados, afiliados });
}
