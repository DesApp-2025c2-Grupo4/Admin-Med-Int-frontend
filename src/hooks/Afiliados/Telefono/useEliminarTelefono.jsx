import { useState } from 'react';
import { eliminarUnTelefono } from '../../../services/afiliados/Telefono/eliminarUnTelefono';
import { toast } from 'react-toastify';
export function useEliminarTelefono(setPersona){
  const [loadingEliminarTelefono, setLoadingEliminarTelefono] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState('')

  const eliminarTelefono = async (telefonoId)=>{
    setLoadingEliminarTelefono(true)
    try {
      const telefonoEliminado = await eliminarUnTelefono(telefonoId)
      if(telefonoEliminado){
        setPersona(prev=>({...prev, telefonos: prev.telefonos.filter(t=>t.telefonoId !==telefonoId)}))
        toast.success('Telefono Eliminado con éxito')
        setData(telefonoEliminado)
      }
    } catch (error) {
      console.error(error)
      toast.error('Error en el servidor')
      setError(error)
    } finally{
      setLoadingEliminarTelefono(false)
    }

  }
  return{
    data,
    loadingEliminarTelefono,
    eliminarTelefono,
    error
  }
}