export const validarEmail = (email,listaEmails)=>{
  let error = ''
  if (email === '') {
    error = 'El email no puede ser vacio'
    return error
  };
  const isDuplicado = listaEmails.some(
    (emailGuardado) => emailGuardado.trim().toUpperCase() === email.trim().toUpperCase()
  );
  if (isDuplicado) {
    error = 'Email existente'
    return error
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!regex.test(email)) return error='Email inválido';

  return error
}