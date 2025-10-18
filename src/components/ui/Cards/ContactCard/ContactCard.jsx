import '../BaseCard.css';
import { IconDelete } from '../../IconDelete/IconDelete';
import { useState } from 'react';
export function ContactCard({ texto, onDelete }) {
    const [desmontando,setDesmontando] = useState(false)
    const handleClick = ()=>{
        setDesmontando(true)
        setTimeout(()=>onDelete(),50)
    }
    return (
        <div className={`card-container contact-card-with-delete ${desmontando ? 'fade-out':''}`} >
            <span className='card-contact-text'>{texto}</span>
            <div className="container-btns-card">
                <button
                    onClick={handleClick} 
                    className="delete-button" 
                >
                    <IconDelete />
                    Eliminar
                </button>
            </div>

        </div>
    );
}

// import '../BaseCard.css';

// export function ContactCard({ texto }) {
//     return (
//         <div className="card-container">
//             <span>{texto}</span>
//         </div>
//     );
// }