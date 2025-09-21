import './ModalDeConfirmacion.css'
import { WarningIcon } from '../../assets/icons/WarningIcon'
export function ModalDeConfirmacion({funcionConfirmar, funcionCancelar, text}){
  /*
    Descripcion: Modal que confirma o rechaza una accion
    DE:
      funcionConfirmacion : Funcion que se ejecuta al dar click en "Confirmar"
      funcionCancelacion : Funcion que se ejecuta cuando doy en "Cancelar"
      text : Texto que se muestra en el modal
  */
  return(
    <div className="modal__container-max">
      <article className='modal__container'>
        <div className="modal__header-container">
          <WarningIcon />
          <p className="modal__text">
            {text}
          </p>
        </div>
        
        <div className="modal__btns-container">
          <button className="modal__btn-confirmar" onClick={funcionConfirmar}>Confirmar</button>
          <button className="modal__btn-cancelar" onClick={funcionCancelar}>Cancelar</button>
        </div>
      </article>
    </div>
  )
}