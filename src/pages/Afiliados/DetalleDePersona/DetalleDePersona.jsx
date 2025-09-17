import { useParams } from 'react-router'
import './DetalleDePersona.css'
import { useGetDetallePersona } from '../../../hooks/useGetDetalleDePersona'
import { Loader } from '../../../components/Loader/Loader'
export function DetalleDePersona(){
  //Obtengo el id
  const { id } = useParams()

  //Hago llamada al backend
  const { error, loadingPersona, persona }=useGetDetallePersona(id) 

  // En caso de que esté Cargando
  if(loadingPersona){
    return(
      <section className='section-detalle-persona__container'>
        <Loader />
      </section>
    ) 
  }

  // En Caso de error

  // En caso de que esté
  if(error){
    return(
      <section className='section-detalle-persona__container'>
        <h2 className='message-error'>{error}</h2>
      </section>
    ) 
  }
  
  // En caso de que haya encontrado los resultados
  return(
    <>
      <section className='section-detalle-persona__container'>
        <h2>{persona}</h2>
      </section>
    </>
  )
}