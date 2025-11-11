import { useState } from 'react';
import { editarUnaDireccion } from '../../../services/afiliados/Direccion/editarUnaDireccion';
import { toast } from 'react-toastify';

export function useEditarDireccion(setPersona) {
  const [loadingEditarDireccion, setLoadingEditarDireccion] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const editarDireccion = async (direccionId, dataDirecccion) => {
    setLoadingEditarDireccion(true);
    try {
      const direccionEditado = await editarUnaDireccion(direccionId, dataDirecccion);
      if (direccionEditado) {
        setPersona(prev => ({
          ...prev,
          direcciones: prev.direcciones.map(d => d.direccionId === direccionId ? direccionEditado : d)
        }));
        toast.success('Direccion editado con éxito');
        setData(direccionEditado);
      }
    } catch (error) {
      console.log(error);
      toast.success('Error en el servidor')
      setError(error);
    } finally {
      setLoadingEditarDireccion(false);
    }
  };

  return {
    data,
    loadingEditarDireccion,
    editarDireccion,
    error
  };
}
