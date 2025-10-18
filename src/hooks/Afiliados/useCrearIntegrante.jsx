import { useState } from "react"
import { crearIntegrante } from "../../services/afiliados/crearIntegrante"
import { useNavigate} from "react-router"
export const useCrearIntegrante = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState('')
  const crearUnIntegrante = async (data)=>{
    try {
      const integranteCreado = await crearIntegrante(data)
      if(!integranteCreado){
        setError('Error al crear el integrante')
        alert(error)
        return
      }
      alert('Integrante creado con éxito')
      console.log(integranteCreado)
      setData(integranteCreado)
      navigate('/afiliados/gestionar')
    } catch (error) {
      console.log(error)
      alert(error)
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