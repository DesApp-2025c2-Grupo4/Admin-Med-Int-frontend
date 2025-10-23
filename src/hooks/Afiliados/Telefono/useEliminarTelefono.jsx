import { useState } from 'react';
import { eliminarUnTelefono } from '../../../services/afiliados/Telefono/eliminarUnTelefono';
export function useEliminarTelefono(setPersona){
  const [loadingEliminarTelefono, setLoadingEliminarTelefono] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState('')

  const eliminarTelefono = async (telefonoId)=>{
    setLoadingEliminarTelefono(true)
    try {
      console.log('Lllego a eliminar')
      const telefonoEliminado = await eliminarUnTelefono(telefonoId)
      if(telefonoEliminado){
        setPersona(prev=>({...prev, telefonos: prev.telefonos.filter(t=>t.telefonoId !==telefonoId)}))
        alert('Telefono Eliminado con éxito')
        setData(telefonoEliminado)
      }
    } catch (error) {
      console.log(error)
      alert(error)
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