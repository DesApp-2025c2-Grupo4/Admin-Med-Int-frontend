import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { FormGrupoFamilia } from "./FormGrupoFamilia/FormGrupoFamilia.jsx"
import { useCrearGrupo } from '../../../hooks/Afiliados/useCrearGrupo.jsx'
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto.jsx'
import './NuevoGrupoFamilia.css'
import { RegisterGroup } from "../../../components/ui/RegisterGroup/RegisterGroup.jsx"
export function NuevoGrupoFamiliar(){
    const {loading, crearUnGrupo, error} = useCrearGrupo()
    return (
        <section className="section__nuevo-grupo-familiar-container box-border" style={{position:'relative'}}>
            {
                loading &&
                <div className="conteiner-loader-formulario">
                    <LoaderConTexto text={'Enviando Formulario'}/>
                </div>
            }
            <TitleSection text="Nuevo Grupo Familiar" />
            <FormGrupoFamilia 
                text="Datos del titular"
                component={RegisterGroup}
                funcionSubmit={crearUnGrupo}
            />
        </section>
    )
}