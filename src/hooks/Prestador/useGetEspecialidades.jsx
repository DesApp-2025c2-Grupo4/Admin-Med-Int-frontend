import { useEffect, useState } from "react";
import { getEspecialidades } from "../../services/prestadores/getEspecialidades";

export function useGetAllEspecialidades() {
  const [especialidades, setEspecialidades] = useState(null);
  const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await getEspecialidades();
        setEspecialidades(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener todas las especialidades`);
      } finally {
        setLoadingEspecialidades(false);
      }
    };

    fetchEspecialidades();
  }, []);

  return { error, loadingEspecialidades, especialidades };
}