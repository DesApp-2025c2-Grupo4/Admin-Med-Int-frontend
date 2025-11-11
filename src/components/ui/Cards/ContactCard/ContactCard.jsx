import '../BaseCard.css';
import { IconDelete } from '../../IconDelete/IconDelete';
import { useState } from 'react';

export function ContactCard({ texto, onDelete, isDireccion = false }) {
    const [desmontando, setDesmontando] = useState(false)
    
    const handleClick = () => {
        setDesmontando(true)
        setTimeout(() => onDelete(), 50)
    }

    const textoMostrar = isDireccion
        ? [
            texto.calle,
            texto.nro ? `- ${texto.nro}` : 'N/A', 
            texto.codigoPostal ? `(CP: ${texto.codigoPostal})` : ''
          ]
          .filter(part => part) 
          .join(' ') 
        : texto;

    return (
        <div className={`card-container contact-card-with-delete ${desmontando ? 'fade-out' : ''}`} >
            <span className='card-contact-text'>{textoMostrar}</span> 
            <div className="container-btns-card">
                <button
                    onClick={handleClick}
                    className="delete-button"
                    type='button'
                >
                    <IconDelete />
                    Eliminar
                </button>
            </div>
        </div>
    );
}