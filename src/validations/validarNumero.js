export const validarNumero = (numero, nombre, minimo = 8,maximo=10)=>{
  let error = ''
  if (numero === '') {
    return error = 'Campo necesario'
  };

  if(numero.length<minimo){
    return error = `Minimo ${minimo} digitos.`
  }
  if(numero.length>maximo){
    return error = `Maximo ${maximo} digitos.`
  }
  if(isNaN(numero)){
    return error= `Debe ingresar un ${nombre} válido`
  }
  return error
}