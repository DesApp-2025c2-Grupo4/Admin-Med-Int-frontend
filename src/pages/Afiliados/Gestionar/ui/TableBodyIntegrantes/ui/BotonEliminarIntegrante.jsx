import { Tooltip } from "react-tooltip"
import { DeleteIcon } from '../../../../../../assets/icons/Afiliados/DeleteIcon'
import { Link } from "react-router"
export function BotonEliminarIntegrante({esTitular, id, handleClick}){
  return(
    <>
      {
        esTitular ?
        <button 
          disabled={true} 
          style={{background:'none',border:'none'}}
          data-tooltip-id={`tooltip-${id}1`}
          data-tooltip-content='Accion Inválida'
          className="cursor-help text-blue-600 font-medium"
          >
          <DeleteIcon color={'#550b0b67'}></DeleteIcon> 
          <Tooltip 
            id={`tooltip-${id}1`}
            place="bottom"
            style={{
              whiteSpace: "pre-line",
            }}
          />
        </button>:
        <Link 
          onClick={()=> handleClick(id)}
          data-tooltip-id={`tooltip-${id}`}
          data-tooltip-content='Eliminar'
          className="cursor-help text-blue-600 font-medium"
          >
          <DeleteIcon ></DeleteIcon>
          <Tooltip 
            id={`tooltip-${id}`}
            place="bottom"
            style={{
              whiteSpace: "pre-line",
            }}
          />
        </Link>
      }
    </>
  )
}