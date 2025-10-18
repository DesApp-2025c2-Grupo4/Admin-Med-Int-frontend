import '../BaseCard.css';
import { IconDelete } from '../../IconDelete/IconDelete';
export function SituacionCard({ situacion, onDelete,mostrarBtn=true}) {
    const getFechaFormateada = (dateString) => {
        if (!dateString) return null;

        const date = new Date(dateString + 'T00:00:00'); 
        return date.toLocaleDateString('es-ES'); 
    };

    const fechaInicio = getFechaFormateada(situacion.fechaInicio);
    const fechaFinal = getFechaFormateada(situacion.fechaFin);

    return (
        <div className="card-container ">
            <div className="situacion-info">
                <span className="card-situacion-text card-situacion-titulo">{situacion.descripcion}</span>
                <span className="card-situacion-text">
                    Es crónica: <strong style={{fontWeight:600}}>{situacion.esCronica ? 'Sí' : 'No'}</strong>
                </span>
                <span className="card-situacion-text">
                    Fecha Inicio: <strong style={{fontWeight:600}}>{situacion.esCronica? 'N/A' : fechaInicio}</strong>
                </span>
                <span className="card-situacion-text">
                    Fecha Fin: <strong style={{fontWeight:600}}>{situacion.esCronica? 'N/A' : fechaFinal}</strong>
                </span>
            </div>
            {
                mostrarBtn &&
                <div className="container-btns-card">
                    <button 
                        onClick={onDelete} 
                        className="delete-button " 
                        aria-label={`Eliminar ${situacion.descripcion}`}
                    >
                        <IconDelete /> Eliminar
                    </button>
                </div>
            }


        </div>
    );
}


// import '../BaseCard.css';

// export function SituacionCard({ situacion }) {
//     return (
//         <div className="card-container">
//             <span>{situacion.descripcion}</span>
//         </div>
//     );
// }