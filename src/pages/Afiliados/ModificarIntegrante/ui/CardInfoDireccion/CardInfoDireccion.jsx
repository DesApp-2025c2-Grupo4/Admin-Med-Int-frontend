import '../CardInfo/CardInfo.css'
import { DeleteIcon } from '../../../../../assets/icons/Afiliados/DeleteIcon'
import { SaveIcon } from '../../../../../assets/icons/Afiliados/SaveIcon'
import { useState } from 'react'
import { ModalDeConfirmacion} from '../../../../../components/ModalDeConfirmacion/ModalDeConfirmacion'
export function CardInfoDireccion({
  data,
  funcionActualizarDato,
  funcionEliminarDato
}){
  //Estado para mostrar modal
  const [showModal, setShowModal] = useState(false)
  const [mensajeModal, setMensajeModal] = useState()
  const [funcionEjecutarModal, setFuncionEjecutarModal] = useState()
  //Estado para los inputs
  const [dataCard,setDataCard] = useState({
    calle:data.calle,
    nro:data.nro
  })
  //funcion para escribir en inputs
  const handleChange = (e)=>{
    const nameKey = e.target.name
    const value = e.target.value
    setDataCard(prev => (
      {
        ... prev,
        [nameKey]:value
      }
    ))
  }
  //Funciones handleClicks
  const handleClickGuardar = ()=>{
    setShowModal(true)
    setMensajeModal(`¿Seguro que desea guardar cambios?`)
    setFuncionEjecutarModal(()=>funcionActualizarDato)
  }
  const handleClickEliminar = ()=>{
    setShowModal(true)
    setMensajeModal(`¿Seguro que desea eliminar la direccion: ${dataCard.calle} - ${data.nro ? data.nro:'N/A'}`)
    setFuncionEjecutarModal(()=>funcionEliminarDato)
  }
  return(
    <>
      {
        showModal &&
        <ModalDeConfirmacion 
          text={mensajeModal}
          funcionConfirmar={()=>{
            setShowModal(false) 
            return funcionEjecutarModal(data.direccionId,dataCard)
          }}
          funcionCancelar={()=>setShowModal(false)}
        />
      }
      <article className="card-info-container">
        <div style={{display:'flex'}}>
          <input 
            name='calle'
            className="card-info-titulo" 
            style={{textAlign: 'right', width:'190px', padding:'0 !Important'}}
            value={dataCard.calle}
            onChange={handleChange}
          />
          <input 
            name='nro'
            className="card-info-titulo" 
            value={dataCard.nro}
            style={{borderLeft:'1px solid #59637018', width:'70px', textAlign:'left !Importan', padding:'0 !Important'}}
            onChange={handleChange}
          />
        </div>
        
        <div className="card-info-body">
          <button className='card-body-btn'onClick={handleClickGuardar}>
            <SaveIcon />
          </button>
          <div className='divisor'></div>
          <button className='card-body-btn'onClick={handleClickEliminar}>
            <DeleteIcon />
          </button>
        </div>
      </article>    
    </>

  )
}
