import { useState } from 'react';
import { actualizarUnaPersona } from '../../services/afiliados/actualizarUnaPersona.js'
import { toast } from 'react-toastify';
export function useActualizarPersona(setPersona){
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const [error, setError] = useState('')

  const actualizarPersona = async (id,data)=>{
    setLoading(true)
    try {
      const personaActualizada = await actualizarUnaPersona(id,data)
      setPersona(personaActualizada)
      toast.success('Se actualizó correctamente.')
    } catch (error) {
      console.log(error)
      setError(error)
      toast.error('Error en el servidor.')
    }
    finally{
      setLoading(false)
    }
  }
  return {
    loading, error, data, actualizarPersona
  }
}