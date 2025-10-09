import { useEffect, useState } from "react";
import { getPrestadores } from "../services/prestadores/getPrestadores";

export function useGetAllPrestadores() {
  const [prestadores, setPrestadores] = useState(null);
  const [loadingPrestadores, setLoadingPrestadores] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const data = await getPrestadores();
        setPrestadores(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener todos los prestadores`);
      } finally {
        setLoadingPrestadores(false);
      }
    };

    fetchPrestadores();

  }, []);

  return( { error, loadingPrestadores, prestadores });
}
