import { useState } from "react";
import { crearGrupo } from '../../services/afiliados/crearGrupo'
export function useCrearGrupo(){
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data,setData] = useState('')
  
  //Funcion para crear un grupo
  const crearUnGrupo = async (dataForm) => {
    setLoading(true)
    try {
      const grupoCreado = await crearGrupo(dataForm)
      if(!grupoCreado){
        setError('Error al crear grupo')
        alert(error)
      }
      alert('Grupo creado con exito')
      setData(grupoCreado)
    } catch (error) {
      console.error(error)
      setError('Error al crear un grupo :'+error)
    }finally{
      setLoading(false)
    }
  }
  return{
    data,
    loading,
    crearUnGrupo,
    error
  }
}