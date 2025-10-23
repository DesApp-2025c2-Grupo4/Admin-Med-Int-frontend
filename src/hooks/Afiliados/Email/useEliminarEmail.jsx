import { useState } from 'react';
import { eliminarUnEmail } from '../../../services/afiliados/Email/eliminarUnEmail';

export function useEliminarEmail(setPersona) {
  const [loadingEliminarEmail, setLoadingEliminarEmail] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const eliminarEmail = async (emailId) => {
    setLoadingEliminarEmail(true);
    try {
      console.log('Llegó a eliminar email');
      const emailEliminado = await eliminarUnEmail(emailId);
      console.log()
      if (emailEliminado) {
        setPersona(prev => ({
          ...prev,
          email: prev.email.filter(e => e.emailId !== emailId)
        }));
        alert('Email eliminado con éxito');
        setData(emailEliminado);
      }
    } catch (error) {
      console.log(error);
      alert(error);
      setError(error);
    } finally {
      setLoadingEliminarEmail(false);
    }
  };

  return {
    data,
    loadingEliminarEmail,
    eliminarEmail,
    error
  };
}
