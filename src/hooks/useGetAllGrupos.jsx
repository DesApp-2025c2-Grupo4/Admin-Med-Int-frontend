import { useEffect, useState } from "react";
import { getGruposFamiliares } from "../services/afiliados/getGruposFamiliares";

export function useGetAllGrupos() {
  const [grupos, setGrupos] = useState(null);
  const [loadingGrupos, setLoadingGrupos] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const data = await getGruposFamiliares();
        setGrupos(data);
      } catch (err) {
        console.error(err);
        setError(`Error al obtener todos los grupos familiares`);
      } finally {
        setLoadingGrupos(false);
      }
    };

    fetchGrupos();

  }, []);

  return( { error, loadingGrupos, grupos });
}
