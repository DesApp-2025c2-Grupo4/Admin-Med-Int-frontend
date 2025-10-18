import { Tooltip } from "react-tooltip"
import { Link } from "react-router"
import { DetailsIcon } from '../../../../../../assets/icons/Afiliados/DetailsIcon'
export function BotonDetallesDeIntegrante({id}){
  return(
    <>
      <Link 
        to={'/afiliados/gestionar/detalles/persona/'+id}
        data-tooltip-id={`tooltip-${id}3`}
        data-tooltip-content='Ver detalles'
        className="cursor-help text-blue-600 font-medium"
        >
        <DetailsIcon></DetailsIcon>
        <Tooltip 
            id={`tooltip-${id}3`}
            place="bottom"
            style={{
              whiteSpace: "pre-line",
            }}
        />
      </Link>
    </>
    
  )
}