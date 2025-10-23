import { useState } from 'react';
import { agregarUnTelefono } from '../../../services/afiliados/Telefono/agregarUnTelefono';
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
        alert('Telefono agregado con éxito')
        setData(telefonoAgregado)
      }
    } catch (error) {
      console.log(error)
      alert(error)
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