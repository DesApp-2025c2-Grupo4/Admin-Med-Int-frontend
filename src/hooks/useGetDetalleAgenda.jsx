import { useEffect, useState } from "react";
import { getAgendaById } from "../services/agenda/getAgendaById";

export function useGetDetalleAgenda(id) {
  const [agenda, setAgenda] = useState(null);
  const [loadingAgenda, setLoadingAgenda] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAgendaById = async () => {
      try {
        const data = await getAgendaById(id);
        setAgenda(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener los datos de la agenda con id ${id}`);
      } finally {
        setLoadingAgenda(false);
      }
    };

    fetchAgendaById();
  }, [id]);

  return { error, loadingAgenda, agenda };
}