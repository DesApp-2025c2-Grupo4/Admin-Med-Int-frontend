import { useState } from 'react';
import { agregarUnaDireccion } from '../../../services/afiliados/Direccion/agregarUnaDireccion';
import { toast } from 'react-toastify';

export function useAgregarDireccion(setPersona) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const agregarDireccion = async (direccion, idPersona) => {
    setLoading(true);
    try {
      const direccionAgregado = await agregarUnaDireccion(direccion, idPersona);
      if (direccionAgregado) {
        setPersona(prev => ({
          ...prev,  
          direcciones: [...prev.direcciones, direccionAgregado]
        }));
        toast.success('Dirección agregada correctamente.')
        setData(direccionAgregado);
      }
    } catch (error) {
      console.error(error);
      toast.success('Error en el servidor')
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    agregarDireccion,
    error
  };
}
