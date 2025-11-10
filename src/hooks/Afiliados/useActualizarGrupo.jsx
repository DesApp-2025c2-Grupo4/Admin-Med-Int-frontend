import { useState } from "react";
import { actualizarUnGrupo } from '../../services/afiliados/actualizarUnGrupo.js'
import { toast } from "react-toastify";
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
      toast.success('Actualizado con éxito')
      setData(grupoActualizado)
    } catch (error) {
      console.log(error)
      toast.error(error)
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