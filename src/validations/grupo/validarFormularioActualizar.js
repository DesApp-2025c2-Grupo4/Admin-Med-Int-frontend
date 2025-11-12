import {validarFecha} from '../validarFecha'
export const validarFormularioActualizar = (data)=>{
  //Primero creo mis errores
  let errores={};
  //Verifico que haya fecga de alta
  if(!data.fechaAlta){
    errores.fechaAlta = 'Debe ingresar una fecha de alta'
    return errores
  }

  //Creo las nuevas fechas de alta
  const fechaAlta = new Date(data.fechaAlta)
  const fechaBaja = !data.fechaBaja ? null : new Date(data.fechaBaja)
  

  //Verifico que sea una que la fecha de alta no sea muy antigua o muy adelantada
  const fechaAltaMaxima = new Date()
  fechaAltaMaxima.setMonth(fechaAltaMaxima.getMonth()+1)
  errores.fechaAlta = validarFecha(fechaAlta,fechaAltaMaxima, new Date(1900,1,1))

  //Verifico que la fecha de baja no sea menor a la fecha de alta
  errores.fechaBaja = fechaBaja && fechaAlta >= fechaBaja ? 'La fecha de baja debe ser mayor a la fecha de alta':''
  const fechaBajaMinima = new Date(data.fechaAlta)
  fechaBajaMinima.setMonth(fechaBajaMinima.getMonth()+1)

  //Verifico que haya o no error en la validacion anterior
  if(errores.fechaBaja === '' && data.fechaBaja){
    errores.fechaBaja = validarFecha(data.fechaBaja, new Date(2100,1,1), fechaBajaMinima)
  }

  //Verifico que la fecha de baja sea mayor a un mes de la fecha de alta
  return errores
}