import { useEffect, useState } from "react";
import { getAgenda } from "../services/agenda/getAgenda";

export function useGetAgenda() {
  const [agenda, setAgenda] = useState(null);
  const [loadingAgenda, setLoadingAgenda] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const data = await getAgenda();
        setAgenda(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener todos los horarios de servicio`);
      } finally {
        setLoadingAgenda(false);
      }
    };

    fetchAgenda();
  }, []);

  return { error, loadingAgenda, agenda };
}
