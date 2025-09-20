import { useState } from 'react';
import './IconoCopiar.css'
import { CheckIcon } from '../../../../../../assets/icons/CheckIcon'
import { CopyIcon }from '../../../../../../assets/icons/CopyIcon'
export function IconoCopiar({texto}){
  const [copiado, setCopiado] = useState(false)
  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };

  return(
    <div className="copy-btn__container">
      {
        copiado ? 
        <div className='icon-check-container'>
          <CheckIcon /> <span>'Copiado'</span>
        </div> :
        <div className="icon-copy-container" title='Copiar'>
          <CopyIcon handleClick ={handleCopiar}/>
        </div>
      }
    </div>
  )
}