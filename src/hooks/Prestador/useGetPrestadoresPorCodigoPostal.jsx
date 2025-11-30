import { useEffect, useState } from "react";
import { getPrestadoresPorCodigoPostal } from "../../services/prestadores/getPrestadoresPorCodigoPostal";

export function useGetPrestadoresPorCodigoPostal(codigoPostal) {
  const [prestadores, setPrestadores] = useState(null);
  const [loadingPrestadores, setLoadingPrestadores] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!codigoPostal) {
      setLoadingPrestadores(false);
      return;
    }

    const fetchPrestadores = async () => {
      setLoadingPrestadores(true);
      try {
        const data = await getPrestadoresPorCodigoPostal(codigoPostal);
        setPrestadores(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener prestadores por código postal`);
      } finally {
        setLoadingPrestadores(false);
      }
    };

    fetchPrestadores();
  }, [codigoPostal]);

  return { error, loadingPrestadores, prestadores };
}