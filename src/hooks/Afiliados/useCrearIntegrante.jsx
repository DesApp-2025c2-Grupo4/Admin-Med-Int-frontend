import { useState } from "react"
import { crearIntegrante } from "../../services/afiliados/crearIntegrante"
import { useNavigate} from "react-router"
import { toast } from "react-toastify";

export const useCrearIntegrante = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState('')
  const crearUnIntegrante = async (data)=>{
    setLoading(true)
    try {
      const integranteCreado = await crearIntegrante(data)
      if(!integranteCreado){
        setError('Error al crear el integrante')
        toast.error(error)
        return
      }
      toast.success('Integrante creado  con éxito')
      setData(integranteCreado)
      navigate('/afiliados/gestionar/1/'+integranteCreado.credencial)
    } catch (error) {
      toast.error(error)
      setError(error)
    }finally{
      setLoading(false)
    }
  }
  return {
    loading,
    error,
    data,
    crearUnIntegrante
  }
}