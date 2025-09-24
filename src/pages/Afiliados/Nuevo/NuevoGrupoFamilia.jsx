import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { FormGrupoFamilia } from "./FormGrupoFamilia/FormGrupoFamilia.jsx"
import { AddMember } from "../../../components/ui/AddMember/AddMember.jsx"
import { RegisterGroup } from "../../../components/ui/RegisterGroup/RegisterGroup.jsx"
import './NuevoGrupoFamilia.css'
export function NuevoGrupoFamiliar(){
    return (
        <section className="section__nuevo-grupo-familiar-container box-border">
            <TitleSection text="Nuevo Grupo Familiar" />
            <FormGrupoFamilia text="Datos del titular"/>
            <div className="button-container">
                <AddMember />
                <RegisterGroup />
            </div>
        </section>
    )
}