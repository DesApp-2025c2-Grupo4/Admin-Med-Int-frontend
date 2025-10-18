import { Link } from "react-router"
import './AddMember.css'
export function AddMember({idGrupo}){
    return (
        <Link to={`/afiliados/agregar-integrante/${idGrupo}`} style={{textDecoration:'none'}}>
            <div className="btn-agregar-miembro-grupo">
                <span className="add-signo">+</span>
                <div className="add-text">
                    Agregar Integrantes
                </div>

            </div>
        </Link>
    )
}