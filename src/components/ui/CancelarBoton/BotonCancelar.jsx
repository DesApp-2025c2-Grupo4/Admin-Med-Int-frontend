import { Link } from 'react-router'
import './BotonCancelar.css'
export function BotonCancelar({path}){
  return(
    <Link to={path} className='btn-cancelar-registrar'>
      <div>
        🗙
      </div>
      <div>
        Cancelar
      </div>
    </Link>
  )
}