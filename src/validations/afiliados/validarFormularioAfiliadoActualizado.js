import { validarNumero } from "../validarNumero"
import { validarTexto } from "../validatTexto"
import { validarFecha, validarFechaAlta, validarFechaBaja } from "../validarFecha"
export function validarFormularioAfiliadoActualizado(data,grupo=null){

  const errores = {}

  //Valido el nombre
  errores.nombre = validarTexto(data.nombre, "Nombre",4,20)

  //Valido el apellido
  errores.apellido = validarTexto(data.apellido, "Apellido", 4,20)

  //Validar dni
  errores.dni = validarNumero(data.dni, "DNI", 8, 15)

  //Validar fecha de nacimiento
  errores.fechaNacimiento = validarFecha(data.fechaNacimiento, new Date(), new Date(1900,1,1))

  
  //Retorno de errores
  return errores
}

