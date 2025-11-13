import { useState } from 'react';
import { editarUnEmail } from '../../../services/afiliados/Email/editarUnEmail';
import { toast } from 'react-toastify';

export function useEditarEmail(setPersona) {
  const [loadingEditarEmail, setLoadingEditarEmail] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const editarEmail = async (emailId, dataEmail) => {
    setLoadingEditarEmail(true);
    try {
      const emailEditado = await editarUnEmail(emailId, dataEmail);
      if (emailEditado) {
        setPersona(prev => ({
          ...prev,
          email: prev.email.map(e => e.emailId === emailId ? emailEditado : e)
        }));
        toast.success('Email editado con éxito');
        setData(emailEditado);
      }
    } catch (error) {
      console.error(error);
      toast.success('Error en el servidor');
      setError(error);
    } finally {
      setLoadingEditarEmail(false);
    }
  };

  return {
    data,
    loadingEditarEmail,
    editarEmail,
    error
  };
}
