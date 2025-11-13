import { useState } from 'react';
import { eliminarUnEmail } from '../../../services/afiliados/Email/eliminarUnEmail';
import { toast } from 'react-toastify';

export function useEliminarEmail(setPersona) {
  const [loadingEliminarEmail, setLoadingEliminarEmail] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const eliminarEmail = async (emailId) => {
    setLoadingEliminarEmail(true);
    try {
      const emailEliminado = await eliminarUnEmail(emailId);
      if (emailEliminado) {
        setPersona(prev => ({
          ...prev,
          email: prev.email.filter(e => e.emailId !== emailId)
        }));
        toast.success('Email eliminado con éxito');
        setData(emailEliminado);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error en el servidor.');
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
