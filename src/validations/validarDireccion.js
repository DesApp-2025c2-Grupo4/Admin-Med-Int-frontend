export const validarDireccion = (dir, listaDir)=>{
  let error = ''
  if (dir === '') {
    return error = 'Ingresa una dirección'
  };
  const isDuplicado = listaDir.some(
    (dirGuardada) => dirGuardada.trim().toUpperCase() === dir
  );
  if (isDuplicado) {
    return error = 'Ya existe la direccion'
  }
  return error
}