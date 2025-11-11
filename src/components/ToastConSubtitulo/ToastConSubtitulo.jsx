import { toast } from 'react-toastify';

export function toastConSubtitulo(title,subtitle,type){
  return(
    toast[type](
      <div>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div  style={{fontSize:'calc(12px + 0.03vw)', marginTop:'5px'
        }}>{subtitle}</div>
      </div>
    )
  )
}