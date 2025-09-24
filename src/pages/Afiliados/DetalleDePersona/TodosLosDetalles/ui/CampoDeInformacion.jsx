import './CampoDeInformacion.css'
import { IconoCopiar } from './IconoCopiar/IconoCopiar'
export function CampoDeInformacion({title= null, info, mostrarCopiar = true}){
  return(
    <div className="info__container">
      <div className='info-data-container'>
        {title && <h3 className='info__title'>{title}</h3>}
        <p className="info__text">
          {info}
        </p>
      </div>
      { mostrarCopiar && <IconoCopiar texto={info}/>}
      
    </div>
  )
}