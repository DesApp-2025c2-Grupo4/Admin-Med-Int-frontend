import { useState } from 'react';
import { registrarse } from '../../services/login/registrarse.js'
import { useNavigate } from 'react-router';
export function useRegistrarse(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const register = async(dataForm) => {
    setError('')
    setLoading(true)
    try {
      const data = await registrarse(dataForm)
      console.log(data)
      if(data.message){
        return setError(data.message)
      }
      alert('Usuario creado correctamente')
      navigate('/login')
    } catch (e) {
      setError('Error en el servidor')
      console.log(e)
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