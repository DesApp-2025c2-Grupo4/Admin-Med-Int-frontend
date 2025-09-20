import { Link } from 'react-router'
import './ButtonEditar.css'
import { EditIcon } from '../../../../../../assets/icons/EditIcon'
export function ButtonEditar({id}){
  return(
    <div className='button-editar-container'>
      <Link className='btn-editar-container'>
        <EditIcon />
        Modificar Datos
      </Link>
    </div>
    
  )
}