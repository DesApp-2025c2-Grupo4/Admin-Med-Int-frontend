import { useState } from "react";
import { crearGrupo } from '../../services/afiliados/crearGrupo'
import { useNavigate } from "react-router";
export function useCrearGrupo(){
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data,setData] = useState('')
  const navigate = useNavigate()
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
      navigate('/afiliados/gestionar/'+grupoCreado.titular.credencial)
    } catch (error) {
      console.error(error)
      alert(error)
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