import { useState } from "react";
import { eliminarUnIntegrante } from "../../services/afiliados/eliminarUnIntegrante";
import { toast } from 'react-toastify';
export function useEliminarIntegrante({setIntegrantes}){
  const [error, setError ] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataEliminada, setData] = useState(null)
  const eliminarIntegrante = async (id) => {
    setLoading(true)
    try {
      const integranteEliminado = await eliminarUnIntegrante(id)
      if(integranteEliminado === 0){
        setError('No se pudo eliminar el integrante')
        toast.error('No se encontró el integrante.')
      }else{
        setData(integranteEliminado)
        setIntegrantes((prev) => prev.filter(
          i => i.personaId !== id
        ))
        toast.success('Integrante eliminado correctamente')
      }
    } catch (error) {
      setError('Error al intentear eliminar el integrante')
      console.error(error)
      toast.error('Error en el servidor.')
    }finally{
      setLoading(false)
    }
  }
  return {
    error,
    loading,
    dataEliminada,
    eliminarIntegrante
  }
}