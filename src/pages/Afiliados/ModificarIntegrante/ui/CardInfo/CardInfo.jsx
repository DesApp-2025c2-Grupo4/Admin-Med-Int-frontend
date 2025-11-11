import '../CardInfo/CardInfo.css'
import { DeleteIcon } from '../../../../../assets/icons/Afiliados/DeleteIcon'
import { SaveIcon } from '../../../../../assets/icons/Afiliados/SaveIcon'
import { useState } from 'react'
import { formatearTelefono} from '../../../../../utils/formatearNumeroDeTelefono'
import { ModalDeConfirmacion} from '../../../../../components/ModalDeConfirmacion/ModalDeConfirmacion'
import { toast } from 'react-toastify'
export function CardInfo({
  data,
  name,
  nameTabla,
  funcionActualizarDato,
  funcionEliminarDato,
  cantidadElementos
}){
  console.log(cantidadElementos)
  //Estado para mostrar modal
  const [showModal, setShowModal] = useState(false)
  const [mensajeModal, setMensajeModal] = useState()
  const [funcionEjecutarModal, setFuncionEjecutarModal] = useState()
  //Estado para los inputs
  const [dataCard,setDataCard] = useState({...data})
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
    if(data[name] === dataCard[name]) return
    setShowModal(true)
    setMensajeModal(`¿Seguro que desea guardar cambios?`)
    setFuncionEjecutarModal(()=>funcionActualizarDato)
  }
  const handleClickEliminar = ()=>{
    //Veo si hay al menos un elemento
    if(cantidadElementos === 1) return toast.error(
      <div>
        <div style={{ fontWeight: 'bold' }}>No se puede eliminar</div>
        <div  style={{fontSize:'calc(12px + 0.03vw)', marginTop:'5px'
        }}>Debe haber al menos un {name === 'nroTelefono' ? 'Teléfono' : 'Email'}.</div>
      </div>
    )
    setShowModal(true)
    setMensajeModal(`¿Seguro que desea eliminar el ${name==='nroTelefono' ? 'Telefono': 'Email'}: ${name ==='nroTelefono'? formatearTelefono(data[name]):data[name]}?`)
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
            return funcionEjecutarModal(data[`${nameTabla}Id`],dataCard)
          }}
          funcionCancelar={()=>setShowModal(false)}
        />
      }
      <article className="card-info-container">
        <input 
          className="card-info-titulo" 
          name={name}
          value={
            data.nroTelefono ? 
            formatearTelefono(dataCard.nroTelefono) : 
            dataCard.descripcion 
          }
          onChange={handleChange}
        />
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
