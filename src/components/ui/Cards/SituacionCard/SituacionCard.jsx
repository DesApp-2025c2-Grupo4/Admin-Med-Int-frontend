import '../BaseCard.css';
import { IconDelete } from '../../IconDelete/IconDelete';
export function SituacionCard({ situacion, onDelete }) {
    const getFechaFormateada = (dateString) => {
        if (!dateString) return null;

        const date = new Date(dateString + 'T00:00:00'); 
        return date.toLocaleDateString('es-ES'); 
    };

    const fechaInicio = getFechaFormateada(situacion.fechaInicio);
    const fechaFinal = getFechaFormateada(situacion.fechaFinal);

    return (
        <div className="card-container situacion-card-with-delete">
            <div className="situacion-info">
                <span className="situacion-descripcion">{situacion.descripcion}</span>

                <span className="situacion-estado">
                    {situacion.esCronica 
                        ? ' - Crónica' 
                        : ` - Inicio: ${fechaInicio} | Fin: ${fechaFinal}`
                    }
                </span>
            </div>

            <button 
                onClick={onDelete} 
                className="delete-button" 
                aria-label={`Eliminar ${situacion.descripcion}`}
            >
                <IconDelete />
            </button>
        </div>
    );
}