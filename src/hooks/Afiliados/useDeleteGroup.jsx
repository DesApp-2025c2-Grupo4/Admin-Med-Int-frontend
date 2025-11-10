import { useState } from "react";
import { deleteGrupo } from "../../services/afiliados/deleteGrupo";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export function useDeleteGroup({ setAllGrupos }) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const deleteGroup = async (id) => {
    setLoadingDelete(true);
    setError(null);

    try {
      // NOTA: La BD debe devolver el grupo eliminado
      const groupDeleted = await deleteGrupo(id);
      if (!groupDeleted) {
        setError("No se encontró el grupo");
        toast.error('No se pudo eliminar el grupo')
        return;
      }
      else{
        toast.success('Grupo eliminado correctamente')
      }
      // Actualizar estado de todos los grupos
      if(setAllGrupos) {
        setAllGrupos((prev) => prev.filter((g) => g.idGrupo !== id));
      }else{
        navigate('/afiliados/gestionar')
      }
    } catch (error) {
      console.error(error);
      setError("Error al realizar la petición");
      toast.error('Error en el servidor')
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