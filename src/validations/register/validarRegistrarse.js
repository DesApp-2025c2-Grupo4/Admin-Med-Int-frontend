export function validarRegistrarse(data){
  //Valido el usuario
  if(!isNaN(data.user)) return {user: 'Ingrese un usuario válido'} //Valido que no sea numero
  if(data.user.length <4) return {user: 'El usuario debe tener 4 caracteres como minimo'} //Valido minimo de caracteres
  if(data.user.length >15) return {user: 'El usuario debe tener 15 caracteres como máximo'} //Valido maximo de caracteres
  if(!isNaN(data.user[0])) return {user: 'El usuario no puede iniciar con un numero'} //Valido que no inicie con numeros

  //Valido password
  if(data.password.length <8) return  {password: 'La contraseña debe tener 8 caracteres como minimo'}
  if(data.password.length >20) return {password:  'La contraseña debe tener 20 caracteres como máximo'}

  //Valido password repetida
  if(data.password !== data.passwordRepetida) return {passwordRepetida: 'Las contraseñas deben coincidir'}
  
  return
}