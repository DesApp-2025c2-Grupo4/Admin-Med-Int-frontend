export const validarNumeroDeTelefono = (num,listaNumeros)=>{
  let error = null
  if(isNaN(num)){
    return error= 'Debe ingresar un numero correcto'
  }
  if (num === '') {
    return error = 'El numero no puede ser vacio'
  };
  const isDuplicado = listaNumeros.telefonos?.some(
    (telGuardado) => telGuardado.trim() === num);
  if (isDuplicado) {
    return error = 'Numero existente'
  }
  if(num?.length<8){
    return error = 'El numero debe tener como minimo 8 digitos'
  }
  if(num?.length>10){
    return error = 'El numero debe tener como maximo 10 digitos'
  }
  
  return error
}