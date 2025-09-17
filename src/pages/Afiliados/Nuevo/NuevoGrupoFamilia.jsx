import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { FormGrupoFamilia } from "./FormGrupoFamilia/FormGrupoFamilia.jsx"

export function NuevoGrupoFamiliar(){
    return (
        <section className="section__nuevo-grupo-familiar-container box-border">
            <TitleSection text="Nuevo Grupo Familiar" />
            <FormGrupoFamilia />
        </section>
    )
}