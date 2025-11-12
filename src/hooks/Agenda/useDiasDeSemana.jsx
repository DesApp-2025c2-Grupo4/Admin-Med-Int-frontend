import { useEffect, useState } from "react";
import { getDias } from '../../services/agenda/getDiasDeSemana';

export function useGetDias() {
  const [dias, setDias] = useState(null);
  const [loadingDias, setLoadingDia ] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDia = async () => {
      try {
          const data = await getDias();
          console.log(data)
        setDias(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener todos los dias de la semana.`);
      } finally {
        setLoadingDia(false);
      }
    };

    fetchDia();
  }, []);

  return { error, loadingDias, dias };
}
