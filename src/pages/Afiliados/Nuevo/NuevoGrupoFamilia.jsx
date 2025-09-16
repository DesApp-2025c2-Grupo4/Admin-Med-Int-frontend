import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { SubTitleSection } from "../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { FormGrupoFamilia } from "./FormGrupoFamilia/FormGrupoFamilia.jsx"

export function NuevoGrupoFamiliar(){
    return (
        <section className="section__nuevo-grupo-familiar-container box-border">
            <TitleSection text="Nuevo Grupo Familiar" />
            <SubTitleSection text="Datos del titular" />
            <FormGrupoFamilia />
        </section>
    )
}