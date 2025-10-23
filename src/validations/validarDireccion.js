export const validarDireccion = (dir, listaDir)=>{
  let error = {}
  if (!isNaN(dir.calle)){
    error.calle = 'No puede ingresar numeros'
  }
  if (dir.calle.trim().toUpperCase() === '') {
    error.calle = 'Ingresa una calle'
  };
  const isDuplicado = listaDir.some(
    (dirGuardada) => dirGuardada.calle.trim().toUpperCase() === dir.calle.trim().toUpperCase() && dirGuardada.nro == dir.nro
  )
  if (isDuplicado) {
    error.calle = 'Dirección repedita, cambiar numero y/o calle'
    return error
  }

  //Validaciones del numero
  if(dir.nro === '')return {...error, nro:null}
  if(isNaN(dir.nro)){
    error.nro = 'Ingrese un numero correcto'
  }
  if(Number(dir.nro) <2){
    error.nro = 'Ingrese un numero mayor a 1'
  }
  return error
}