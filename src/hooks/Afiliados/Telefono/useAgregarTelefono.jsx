import { useState } from 'react';
import { agregarUnTelefono } from '../../../services/afiliados/Telefono/agregarUnTelefono';
import { toast } from 'react-toastify';
export function useAgregarTelefono(setPersona){
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState('')

  const agregarTelefono = async (telefono, idPersona)=>{
    console.log(telefono,idPersona)
    setLoading(true)
    try {
      const telefonoAgregado = await agregarUnTelefono(telefono, idPersona)
      if(telefonoAgregado){
        setPersona(prev=>({...prev, telefonos: [...prev.telefonos, telefonoAgregado]}))
        toast.success('Se agregó el telefono correctamente')
        setData(telefonoAgregado)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
      setError(error)
    } finally{
      setLoading(false)
    }

  }
  return{
    data,
    loading,
    agregarTelefono,
    error
  }
}