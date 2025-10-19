import './IconoEstado.css'
export function IconoEstado({estado}){
  const datosMostrar = {
    color: 
      estado === 1 ?
      'rgba(37, 107, 37, 0.75)' : 
      estado === 0 ?
      '#0058b6ff' :
      'rgba(136, 56, 56, 1)',
    text:
      estado === 1 ?
      'ACTIVO' : 
      estado === 0 ?
      'PENDIENTE' :
      'INACTIVO',
  }
  return(
    <span
      className='icono-estado__container'
      style={{backgroundColor:datosMostrar.color}}
    >
      {datosMostrar.text}
    </span>
  )
}