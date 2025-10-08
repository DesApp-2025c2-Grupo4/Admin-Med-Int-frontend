import { useEffect, useState } from "react";
import { getDetalleDePrestador } from "../services/prestadores/getDetallesPrestador";

export function useGetDetallePrestador(id) {
  const [loadingPrestador, setLoadingPrestador] = useState(true);
  const [prestador, setPrestador] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPrestador = async () => {
      try {
        const data = await getDetalleDePrestador(id);
        if (!isMounted) return;

        if (data) {
          setPrestador(data);
        } else {
          setError("Prestador no encontrado");
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(`Error al obtener los datos del prestador con id ${id}`);
        }
      } finally {
        if (isMounted) {
          setLoadingPrestador(false);
        }
      }
    };

    fetchPrestador();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { error, loadingPrestador, prestador };
}