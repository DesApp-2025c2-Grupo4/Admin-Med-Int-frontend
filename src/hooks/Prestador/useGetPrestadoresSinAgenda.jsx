import { useEffect, useState } from "react";
import { getPrestadoresSinAgenda } from "../../services/prestadores/getPrestadoresSinAgenda";

export function useGetPrestadoresSinAgenda() {
  const [prestadores, setPrestadores] = useState(null);
  const [loadingPrestadores, setLoadingPrestadores] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrestadores = async () => {
      try {
        const data = await getPrestadoresSinAgenda();
        setPrestadores(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener prestadores sin agenda`);
      } finally {
        setLoadingPrestadores(false);
      }
    };

    fetchPrestadores();
  }, []);

  return { error, loadingPrestadores, prestadores };
}