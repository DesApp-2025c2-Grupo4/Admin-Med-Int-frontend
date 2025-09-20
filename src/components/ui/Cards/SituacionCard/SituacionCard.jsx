import '../BaseCard.css';

export function SituacionCard({ situacion }) {
    return (
        <div className="card-container">
            <span>{situacion.descripcion}</span>
        </div>
    );
}