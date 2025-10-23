export const validarNumeroDeTelefono = (num,listaNumeros)=>{
  let error = null
  if(isNaN(num)){
    return error= 'Debe ingresar un numero correcto'
  }
  if (num === '') {
    return error = 'El numero no puede ser vacio'
  };
  const isDuplicado = listaNumeros.telefonos?.some(
    (telGuardado) => telGuardado.trim() === num.trim());

  if (isDuplicado) {
    return error = 'Numero existente'
  }
  if(num?.length!=10){
    return error = 'El numero debe tener 10 digitos'
  }
  
  return error
}