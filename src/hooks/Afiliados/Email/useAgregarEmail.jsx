import { useState } from 'react';
import { agregarUnEmail } from '../../../services/afiliados/Email/agregarUnEmail';

export function useAgregarEmail(setPersona) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const agregarEmail = async (email, idPersona) => {
    console.log(email, idPersona);
    setLoading(true);
    try {
      const emailAgregado = await agregarUnEmail(email, idPersona);
      if (emailAgregado) {
        setPersona(prev => ({
          ...prev,
          email: [...prev.email, emailAgregado]
        }));
        alert('Email agregado con éxito');
        setData(emailAgregado);
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
    agregarEmail,
    error
  };
}
