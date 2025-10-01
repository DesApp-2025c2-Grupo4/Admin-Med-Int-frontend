import '../BaseCard.css';
import { IconDelete } from '../../IconDelete/IconDelete';
export function ContactCard({ texto, onDelete }) {
    return (
        <div className="card-container contact-card-with-delete">
            <span>{texto}</span>

            <button 
                onClick={onDelete} 
                className="delete-button" 
                aria-label={`Eliminar ${texto}`}
            >
                <IconDelete />
            </button>
        </div>
    );
}