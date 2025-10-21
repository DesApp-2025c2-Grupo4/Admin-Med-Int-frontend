import { useState } from "react";
import { actualizarUnGrupo } from '../../services/afiliados/actualizarUnGrupo.js'
export function useActualizarUnGrupo(id,setDataForm,setGrupoFamiliar){
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data,setData] = useState('')
  const actualizarGrupo = async (data)=>{
    console.log(data)
    setLoading(true)
    try {
      const grupoActualizado = await actualizarUnGrupo(id,data)
      setGrupoFamiliar(prev=>({
        ...prev,
        planMedico: grupoActualizado.planMedico,
        fechaAlta: grupoActualizado.fechaAlta,
        fechaBaja: grupoActualizado.fechaBaja,
        esActivo:grupoActualizado.esActivo
      }))
      setDataForm({
        planMedico: grupoActualizado.planMedico,
        fechaAlta: grupoActualizado.fechaAlta,
        fechaBaja: grupoActualizado.fechaBaja
      })
      alert('Actualizado con éxito')
      setData(grupoActualizado)
    } catch (error) {
      console.log(error)
      alert('Error:'+error)
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  //Retorno
  return {
    error,
    loading,
    data,
    actualizarGrupo
  }
}