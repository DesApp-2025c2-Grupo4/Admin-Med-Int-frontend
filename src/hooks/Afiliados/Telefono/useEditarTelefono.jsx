import { useState } from 'react';
import { editarUnTelefono } from '../../../services/afiliados/Telefono/editarUnTelefono';
import { toast } from 'react-toastify';
export function useEditarTelefono(setPersona){
  const [loadingEditarTelefono, setLoadingEditarTelefono] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState('')

  const editarTelefono = async (telefonoId,data)=>{
    setLoadingEditarTelefono(true)
    try {
      const telefonoEditado = await editarUnTelefono(telefonoId,data)
      if(telefonoEditado){
        setPersona(prev=>({...prev, telefonos: prev.telefonos.filter(t=>t.telefonoId ===telefonoId ? telefonoEditado : t)}))
        toast.success('Telefono Editado con éxito')
        setData(telefonoEditado)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al Editar el telefono')
      setError(error)
    } finally{
      setLoadingEditarTelefono(false)
    }

  }
  return{
    data,
    loadingEditarTelefono,
    editarTelefono,
    error
  }
}