import { useState } from 'react';
import { registrarse } from '../../services/login/registrarse.js'
import { useNavigate } from 'react-router';
export function useRegistrarse(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const register = async(dataForm) => {
    setError(null)
    setLoading(true)
    try {
      const data = await registrarse(dataForm)
      if(data.message){
        return setError({message: data.message})
      }
      alert('Usuario creado correctamente')
      navigate('/login')
    } catch (e) {
      console.log(e)
      setError({message: 'Error en el servidor'})
    }finally{
      setLoading(false)
    }
  }
  return {
    loading,
    error,
    register,
    setError
  }
}