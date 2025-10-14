import { useParams } from 'react-router'
import { useGetDetallePrestador } from '../../../hooks/useGetDetalleDePrestador'
import './DetalleDePrestador.css'
import { Loader } from '../../../components/Loader/Loader'
import { TitleSection } from '../../../components/TitleSections/TitleSection'
import { SectionDetallesPresonales } from './ui/SectionDetallesPersonales'
import { SectionContacto } from './ui/SectionContacto'
import { SectionProfesion } from './ui/SectionProfesion'
import { ButtonEditar } from '../../Afiliados/DetalleDePersona/TodosLosDetalles/ui/ButtonEditar/ButtonEditar'
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto'
export function DetalleDePrestador(){
  //Obtengo detalles de prestador
  const { id } = useParams()
  //Obtengo detalles de prestador
  const { loadingPrestador, error, prestador} = useGetDetallePrestador(id)

  //Retorno en caso de error
  if (error) return (
    <div className='error-message box-border'>
      <h2>{error}</h2>
    </div>
  )

  //Retorno en el caso de estar cargando
  if(loadingPrestador) return(
    <div className="container-loader">
      <LoaderConTexto />
    </div>
  )

  //Retorno en caso de que todo vaya bien
  return(
    <article className='section-detalle-persona__container box-border'>
      <TitleSection text='Detalles de Prestador'/>
      <SectionDetallesPresonales prestador={prestador}/>
      <SectionContacto prestador={prestador}/>
      <SectionProfesion prestador={prestador}/> 
      <ButtonEditar /> 
    </article>
  )
}