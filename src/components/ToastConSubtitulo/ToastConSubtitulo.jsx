import { toast } from 'react-toastify';
import './ToasConSubtitulo.css'
import { DetailsIcon } from '../../assets/icons/Afiliados/DetailsIcon';
export function toastConSubtitulo(title,subtitle,type,path=null,navigate){
  return(
    toast[type](
      <div className='toast-subtitulo-contenedor'>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div  style={{fontSize:'calc(12px + 0.03vw)', marginTop:'5px'
        }}>{subtitle}</div>
        {
          path && 
          <span 
            onClick={()=>navigate(path)}
            className='toas-con-subtitulo-link'
            >
            Ver detalles
            <DetailsIcon />
          </span>
        }
      </div>
    )
  )
}