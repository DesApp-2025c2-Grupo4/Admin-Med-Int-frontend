import { useEffect, useState } from "react";
import { getPrestadoresPorEspecialidad } from "../../services/prestadores/getPrestadoresPorEspecialidad";

export function useGetPrestadoresPorEspecialidad(especialidadId) {
  const [prestadores, setPrestadores] = useState(null);
  const [loadingPrestadores, setLoadingPrestadores] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!especialidadId) {
      setLoadingPrestadores(false);
      return;
    }

    const fetchPrestadores = async () => {
      setLoadingPrestadores(true);
      try {
        const data = await getPrestadoresPorEspecialidad(especialidadId);
        setPrestadores(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener prestadores por especialidad`);
      } finally {
        setLoadingPrestadores(false);
      }
    };

    fetchPrestadores();
  }, [especialidadId]);

  return { error, loadingPrestadores, prestadores };
}
