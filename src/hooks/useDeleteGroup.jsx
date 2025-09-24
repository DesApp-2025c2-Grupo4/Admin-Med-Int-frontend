import { useState } from "react";
import { deleteGrupo } from "../services/afiliados/deleteGrupo";

export function useDeleteGroup({ setAllGrupos }) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);
  const deleteGroup = async (id) => {
    setLoadingDelete(true);
    setError(null);

    try {
      // NOTA: La BD debe devolver el grupo eliminado
      const groupDeleted = await deleteGrupo({ id });
      if (!groupDeleted) {
        setError("No se encontró el grupo");
        return;
      }

      // Actualizar estado de todos los grupos
      setAllGrupos((prev) => prev.filter((g) => g.idGrupo !== id));
    } catch (error) {
      console.error(error);
      setError("Error al realizar la petición");
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    loadingDelete,
    error,
    deleteGroup,
  };
}