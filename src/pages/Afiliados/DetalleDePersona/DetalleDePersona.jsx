import { useParams } from 'react-router'
import './DetalleDePersona.css'
import { useGetDetallePersona } from '../../../hooks/useGetDetalleDePersona'
import { Loader } from '../../../components/Loader/Loader'
import { TitleSection } from '../../../components/TitleSections/TitleSection'
import { TodosLosDetalles } from './TodosLosDetalles/TodosLosDetalles'
import { useCambiarTitulo } from '../../../hooks/useCambiarTitulo'
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto'
export function DetalleDePersona() {
  //Obtengo el id
  const { id } = useParams()

  //Hago llamada al backend
  const { error, loadingPersona, persona }=useGetDetallePersona(id) 
  
  useCambiarTitulo({ title: "Detalle de Afiliado" });

  //Pantalla que se muestra en caso de estar cargando
  if(loadingPersona) return(
    <LoaderConTexto />
  )

  //En caso de error
  if(error) return(
    <h2 className='message-error'>{error}</h2>
  )

  //Retorno el componente
  return(
    <>
      <section className='section-detalle-persona__container box-border'>
        <TitleSection text='Detalles de Integrante'/>
        <TodosLosDetalles persona={persona} />
      </section>
    </>
  )
}