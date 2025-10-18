import './CardSituacion.css'
export function CardSituacion({situacion}){
  return(
    <article className='card-info-situacion__contaier'>
      <div className='card-info-situacion-text'>
        <p className="info__text">
          {situacion.descripcion}
          {situacion.esCronica ? '(Cronico)' : '(Temporal)'}
        </p>
        <p className='info__text'>
          {`${situacion.fechaInicio} / ${situacion.fechaFin ? situacion.fechaFin : 'N/A'}`}
        </p>
      </div>

      
    </article>
  )
}