import { Link } from 'react-router'
import './ButtonEditar.css'
import { EditIcon } from '../../../../../../assets/icons/EditIcon'
import { useNavigate } from 'react-router'
export function ButtonEditar({path}){
  const navigate = useNavigate()
  return(
    <div 
      className='button-editar-container' 
      onClick={()=> navigate(path)}
      style={{cursor:'pointer'}}
    >
      <span className='btn-editar-container' to={path}>
        <EditIcon />
        Modificar Datos
      </span>
    </div>
    
  )
}