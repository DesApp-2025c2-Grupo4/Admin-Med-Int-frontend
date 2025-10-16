import { Link } from 'react-router'
import './ButtonEditar.css'
import { EditIcon } from '../../../../../../assets/icons/EditIcon'
import { useNavigate } from 'react-router'
export function ButtonEditar({path}){
  const navigate = useNavigate()
  return(
    <div 
      className='button-editar-container' 
    >
      <span className='btn-editar-container' onClick={()=> navigate(path)} style={{cursor:'pointer'}}>
        <EditIcon />
        Modificar Datos
      </span>
    </div>
    
  )
}