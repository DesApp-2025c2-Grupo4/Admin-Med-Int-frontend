import { useState } from 'react';
import { agregarUnaDireccion } from '../../../services/afiliados/Direccion/agregarUnaDireccion';

export function useAgregarDireccion(setPersona) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const agregarDireccion = async (direccion, idPersona) => {
    console.log(direccion, idPersona);
    setLoading(true);
    try {
      const direccionAgregado = await agregarUnaDireccion(direccion, idPersona);
      if (direccionAgregado) {
        setPersona(prev => ({
          ...prev,  
          direcciones: [...prev.direcciones, direccionAgregado]
        }));
        alert('Direccion agregada con éxito');
        setData(direccionAgregado);
      }
    } catch (error) {
      console.log(error);
      alert(error);
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
