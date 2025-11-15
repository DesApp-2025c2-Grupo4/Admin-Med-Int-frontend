import { useState } from 'react';
import { iniciarSesion } from '../../services/login/login.js'
import { useNavigate } from 'react-router';
export function useIniciarSesion(){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = async(dataForm) => {
    setError('')
    setLoading(true)
    try {
      const data = await iniciarSesion(dataForm)
      console.log(data)
      if(!data.token){
        return setError(data.message)
      }
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
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
    login
  }
}