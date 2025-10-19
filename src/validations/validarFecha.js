// validarFecha.js
export const validarFecha = (fecha, maximo, minimo) => {
  console.log(fecha)
  if (!fecha) return 'Campo requerido';
  const fechaObj = new Date(fecha);

  if (fechaObj > maximo) return `Ingrese una fecha inferior a ${maximo.toLocaleDateString('en-CA')}`;
  if (fechaObj < minimo) return `Ingrese una fecha superior a ${minimo.toLocaleDateString('en-CA')}`;

  return '';
}

export const validarFechaAlta = (fecha, fechaAltaGrupo, fechaBajaDelGrupo) => {
  if (!fecha) return 'Campo requerido';

  fecha = new Date(fecha); // asegurar que es Date

  //La fecha es minima un año antes
  const fechaMinima = new Date();
  fechaMinima.setFullYear(fechaMinima.getFullYear() - 1);

  //Fecha maxima 2 meses desde hoy
  const fechaMaxima = new Date();
  fechaMaxima.setMonth(fechaMaxima.getMonth() + 2);

  if (fechaAltaGrupo && fecha < fechaAltaGrupo) 
    return `Ingrese una fecha superior a ${fechaAltaGrupo.toLocaleDateString('en-CA')}`;

  if (fecha < fechaMinima) 
    return `Ingrese una fecha superior a ${fechaMinima.toLocaleDateString('en-CA')}`;

  if (fechaBajaDelGrupo && fecha > fechaBajaDelGrupo) 
    return `Ingrese una fecha inferior a ${fechaBajaDelGrupo.toLocaleDateString('en-CA')}`;

  if (fecha > fechaMaxima) 
    return `Ingrese una fecha inferior a ${fechaMaxima.toLocaleDateString('en-CA')}`;

  return '';
}

export const validarFechaBaja = (fecha, fechaAltaGrupo = null, fechaBajaGrupo = null) => {
  if (!fecha) return '';

  fecha = new Date(fecha);

  // Fecha mínima: un mes después de la fecha de alta o de hoy si no hay grupo
  const fechaMinima = fechaAltaGrupo 
    ? new Date(fechaAltaGrupo) 
    : new Date();
  fechaMinima.setMonth(fechaMinima.getMonth() + 1);

  // Fecha máxima: la fecha de baja del grupo si existe
  const fechaMaxima = fechaBajaGrupo ? new Date(fechaBajaGrupo) : null;

  if (fecha < fechaMinima)
    return `Ingrese una fecha superior a ${fechaMinima.toLocaleDateString('en-CA')}`;

  if (fechaMaxima && fecha > fechaMaxima)
    return `Ingrese una fecha inferior a ${fechaMaxima.toLocaleDateString('en-CA')}`;

  return '';
}