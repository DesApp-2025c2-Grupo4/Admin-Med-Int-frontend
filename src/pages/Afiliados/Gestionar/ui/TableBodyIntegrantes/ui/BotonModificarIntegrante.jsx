import { ModifierIcon } from '../../../../../../assets/icons/Afiliados/ModifierIcon'
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router'
export function BotonModificarIntegrante({id}){
  return(
    <Link 
      to={'/afiliados/gestionar/modificar/persona/'+id}
      data-tooltip-id={`tooltip-${id}4`}
      data-tooltip-content='Editar'
      className="cursor-help text-blue-600 font-medium"
      >
      <ModifierIcon></ModifierIcon>
      <Tooltip 
          id={`tooltip-${id}4`}
          place="bottom"
          style={{
            whiteSpace: "pre-line",
          }}
      />
    </Link>
  )
}