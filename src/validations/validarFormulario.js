import { validarNumero } from "./validarNumero"
import { validarTexto } from "./validatTexto"
import { validarFecha, validarFechaAlta, validarFechaBaja } from "./validarFecha"
export function validarFormulario(data,grupo=null){

  const errores = {}

  //Valido el nombre
  errores.nombre = validarTexto(data.nombre, "Nombre",4,20)

  //Valido el apellido
  errores.apellido = validarTexto(data.apellido, "Apellido", 4,20)

  //Validar dni
  errores.dni = validarNumero(data.dni, "DNI", 8, 8)

  //Validar cantidad de telefonos
  if(data.telefonos.length === 0) errores.telefonos = 'Debes agregar un telefono como minimo.'

  //Validar cantidad de emails
  if(data.emails.length === 0) errores.emails = 'Debes agregar un email como minimo.'

  //Validar cantidad de direcciones
  if(data.direcciones.length === 0) errores.direcciones = 'Debes agregar una dirección como minimo.'

  //Validar fecha de nacimiento
  errores.fechaNacimiento = validarFecha(data.fechaNacimiento, new Date(), new Date(1900,1,1))

  //Validar fecha de Alta
  errores.fechaAlta = validarFechaAlta(data.fechaAlta, grupo?.fechaAlta,grupo?.fechaBaja)

  //Validar fecha de baja
  errores.fechaBaja = validarFechaBaja(data.fechaBaja, grupo?.fechaAlta,grupo?.fechaBaja)
  
  //Retorno de errores
  return errores
}

