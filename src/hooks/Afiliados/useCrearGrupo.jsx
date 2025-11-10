import { useState } from "react";
import { crearGrupo } from '../../services/afiliados/crearGrupo'
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
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
      toast.success('Grupo creado correctamente')
      setData(grupoCreado)
      navigate('/afiliados/gestionar/'+grupoCreado.titular.credencial)
    } catch (error) {
      console.error(error)
      toast.error(error)
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