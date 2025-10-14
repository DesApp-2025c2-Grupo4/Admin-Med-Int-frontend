import './LoaderConTexto.css'
import {Loader} from '../Loader/Loader'
export function LoaderConTexto({text}){
  return(
    <div className="loader-con-texto__container">
      <Loader />
      <h3 className='loader-con-texto__texto'>{text || 'Cargando Contenido...'}</h3>
    </div>
  )
}