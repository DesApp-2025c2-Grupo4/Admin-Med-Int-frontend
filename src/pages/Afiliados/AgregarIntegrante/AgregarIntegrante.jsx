import { useParams } from "react-router"
import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { AddMember } from "../../../components/ui/AddMember/AddMember.jsx"
import { FormAgregarIntegrante } from "./ui/FormAgregarIntegrante.jsx"
import { useGetGrupoFamiliar } from "../../../hooks/useGetGrupoFamiliar.jsx"
import { LoaderConTexto } from "../../../components/LoaderConTexto/LoaderConTexto.jsx"
export function AgregarIntegrante(){
  const { id } = useParams()
  const { loadingGrupos,grupoFamiliar,error} = useGetGrupoFamiliar(id)

  //En caso de que cargue
  if(loadingGrupos){
    return(
      <div className="contendor_loader-detalle">
        <LoaderConTexto />
      </div>
    )
  }
  //En caso de error
  if(error) return(
    <h2 className='message-error'>{error}</h2>
  )
  //Retorno el componente
  return (
    <section className="section__nuevo-grupo-familiar-container box-border">
      <TitleSection text={`Grupo ${grupoFamiliar.nroGrupo} | Agregar Integrante`} />
      <FormAgregarIntegrante grupo={grupoFamiliar}/>
    </section>
  )
}