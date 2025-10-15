import { useState } from "react";
import { eliminarUnPrestador } from "../../services/prestadores/eliminarUnPrestador";
export function useEliminarUnPrestador(setPrestadores){
  // Estados
  const [loading,setLoading] =useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  
  //Funcion para eliminar
  const eliminarPrestador = async (id)=>{
    setLoading(true)
    try {
      const res = await eliminarUnPrestador(id)
      if(!res){
        setError('Error al eliminar el Prestador')
        alert('Error al eliminar un prestador')
      }else{
        setData(data)
        alert('Se eliminó correcto el prestador')
        setPrestadores((prev) => prev.filter(p=>p.prestadorId !== id))
      }
    } catch (error) {
      console.error(error)
      setError('Error en el servidor')
    }finally{
      setLoading(false)
    }
  }

  //Exporto 
  return {
    error,
    data,
    loading,
    eliminarPrestador
  }
}