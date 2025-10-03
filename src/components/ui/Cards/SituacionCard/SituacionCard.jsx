import '../BaseCard.css';

export function SituacionCard({ situacion, onDelete }) {
    return (
        <div className="card-container">
            <span>{situacion.descripcion}</span>
            {onDelete && (
                <button className="delete-btn" onClick={onDelete}>
                    ✕
                </button>
            )}
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