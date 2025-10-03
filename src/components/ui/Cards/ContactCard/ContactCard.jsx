import '../BaseCard.css';

export function ContactCard({ texto, onDelete }) {
    return (
        <div className="card-container">
            <span>{texto}</span>
            {onDelete && (
                <button className="delete-btn" onClick={onDelete}>
                    ✕
                </button>
            )}
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