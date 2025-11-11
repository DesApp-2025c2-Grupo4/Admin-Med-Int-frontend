import { useState } from "react";
import { crearGrupo } from '../../services/afiliados/crearGrupo'
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { toastConSubtitulo } from '../../components/ToastConSubtitulo/ToastConSubtitulo' 
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
      if(grupoCreado.titular.error){
        setError('Error al crear grupo')
        toastConSubtitulo(
          grupoCreado.titular.error,//Titulo
          grupoCreado.titular.details[0],
          'error'
        )
        return
      }
      toast.success('Grupo creado correctamente')
      setData(grupoCreado)
      navigate('/afiliados/gestionar/1/'+grupoCreado.titular.credencial)
    } catch (error) {
      console.error(error)
      toastConSubtitulo('Error en el servidor', error.message, 'error')
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