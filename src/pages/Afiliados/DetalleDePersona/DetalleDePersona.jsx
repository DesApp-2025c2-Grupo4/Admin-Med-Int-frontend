import { useParams } from 'react-router'
import './DetalleDePersona.css'
import { useGetDetallePersona } from '../../../hooks/useGetDetalleDePersona'
import { Loader } from '../../../components/Loader/Loader'
import { TitleSection } from '../../../components/TitleSections/TitleSection'
import { TodosLosDetalles } from './TodosLosDetalles/TodosLosDetalles'
export function DetalleDePersona(){
  //Obtengo el id
  const { id } = useParams()

  //Hago llamada al backend
  const { error, loadingPersona, persona }=useGetDetallePersona(id) 
  
  return(
    <>
      <section className='section-detalle-persona__container box-border'>
        <TitleSection text='Detalles de Integrante'/>

        {/* Renderizados condicionales */}
        {
          loadingPersona ?
          <div className="contendor_loader-detalle">
            <Loader />
          </div> : //Muestra el Loader en caso de estar cargando
          error ? //Muestra el error en caso de estar cargando
          <h2 className='message-error'>{error}</h2> :
          <TodosLosDetalles persona={persona} />
        }
      </section>
    </>
  )
}