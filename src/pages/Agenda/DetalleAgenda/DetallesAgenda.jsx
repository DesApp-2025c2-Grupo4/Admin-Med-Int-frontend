import { useParams } from 'react-router'
import { useGetDetalleAgenda } from '../../../hooks/useGetDetalleAgenda.jsx'
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto.jsx'
import { useCambiarTitulo } from '../../../hooks/useCambiarTitulo'
import { SubTitleSection } from '../../../components/ui/SubTitleSection/SubTitleSection.jsx'
import { TitleSection } from '../../../components/TitleSections/TitleSection.jsx'
import { SectionDetalleAgenda } from './ui/SectionDetalleAgenda/SectionDetalleAgenda.jsx'

export function DetallesAgenda(){
    const { id } = useParams()

    const { error, loadingAgenda, agenda }=useGetDetalleAgenda(id)

    useCambiarTitulo({ title: "Detalle de Agenda" });

    if(loadingAgenda) return(
        <div className="contendor_loader-detalle">
            <LoaderConTexto />
        </div>
      )
      console.log(error)
      //En caso de error
    if(error) return(
        <div className='centrar'>
            <SubTitleSection text={error} />
        </div>
    )

    return(
        <>
          <section className='section-detalle-agenda__container box-border'>
            <TitleSection text='Detalles de Agenda'/>
            <SectionDetalleAgenda agenda={agenda} />
          </section>
        </>
      )
}