import { useState } from "react";
import { eliminarUnaAgenda } from "../../services/agenda/eliminarAgenda";
export function useEliminarUnaAgenda(setAgenda){
  // Estados
  const [loading,setLoading] =useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  
  //Funcion para eliminar
  const eliminarAgenda = async (id)=>{
    setLoading(true)
    try {
      const res = await eliminarUnaAgenda(id)
      if(!res){
        setError('Error al eliminar una agenda')
        alert('Error al eliminar una agenda')
      }else{
        setData(data)
        alert('Se eliminó correcto la agenda')
        setAgenda((prev) => prev.filter(p=>p.agendaId !== id))
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
      eliminarAgenda
  }
}