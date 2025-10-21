import {validarFecha} from '../validarFecha'
export const validarFormularioActualizar = (data)=>{
  console.log(data)

  //Primero creo mis errores
  let errores={};

  //Verifico que sea una que la fecha de alta no sea muy antigua o muy adelantada
  const fechaMaxima = new Date()
  fechaMaxima.setMonth(fechaMaxima.getMonth()+1)
  errores.fechaAlta = validarFecha(data.fechaAlta,fechaMaxima, new Date(1900,1,1))

  //Verifico que la fecha de baja no sea menor a la fecha de alta
  errores.fechaBaja = data.fechaAlta<data.fechaBaja ? 'La fecha de baja debe ser mayor a la fecha de alta':''
  const fechaMinima = new Date(data.fechaAlta)
  fechaMaxima.setMonth(fechaMaxima.getMonth()+1)
  errores.fechaBaja = validarFecha(data.fechaBaja, new Date(2100,1,1), fechaMinima,false)

  //Verifico que la fecha de baja sea mayor a un mes de la fecha de alta
  return errores
}