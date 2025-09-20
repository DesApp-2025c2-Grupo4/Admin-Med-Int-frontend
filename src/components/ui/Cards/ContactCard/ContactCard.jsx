import '../BaseCard.css';

export function ContactCard({ texto }) {
    return (
        <div className="card-container">
            <span>{texto}</span>
        </div>
    );
}