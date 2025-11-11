import { useState } from 'react';
import { eliminarUnaDireccion } from '../../../services/afiliados/Direccion/eliminarUnaDireccion';
import { toast } from 'react-toastify';

export function useEliminarDireccion(setPersona) {
  const [loadingEliminarDireccion, setLoadingEliminarDireccion] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const eliminarDireccion = async (direccionId) => {
    setLoadingEliminarDireccion(true);
    try {
      const direccionEliminada = await eliminarUnaDireccion(direccionId);
      if (direccionEliminada) {
        setPersona(prev => ({
          ...prev,
          direcciones: prev.direcciones.filter(d => d.direccionId !== direccionId)
        }));
        toast.success('Direccion eliminada con éxito');
        setData(direccionEliminada);
      }
    } catch (error) {
      console.log(error);
      toast.success('Error en el servidor')
      setError(error);
    } finally {
      setLoadingEliminarDireccion(false);
    }
  };

  return {
    data,
    loadingEliminarDireccion,
    eliminarDireccion,
    error
  };
}
