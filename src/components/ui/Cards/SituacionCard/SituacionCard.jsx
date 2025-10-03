import '../BaseCard.css';

export function SituacionCard({ situacion }) {
    const { descripcion, esCronica, fechaInicio, fechaFinal } = situacion;

    return (
        <div className="card-container">
            <div className="situacion-info">
                <span className="situacion-descripcion">{descripcion}</span>
                {esCronica && <span className="situacion-cronica"> (Crónica)</span>}
                {fechaInicio && fechaFinal && (
                    <span className="situacion-fechas">
                        {' '} - {new Date(fechaInicio).toLocaleDateString()} a {new Date(fechaFinal).toLocaleDateString()}
                    </span>
                )}
            </div>
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