import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { FormGrupoFamilia } from "../Nuevo/FormGrupoFamilia/FormGrupoFamilia.jsx"
import { AddMember } from "../../../components/ui/AddMember/AddMember.jsx"
import { Register } from "../../../components/ui/Register/Register.jsx"
export function ModificarIntegrante(){
    return (
        <section className="section__nuevo-grupo-familiar-container box-border">
            <TitleSection text="Modificar Integrante" />
            <FormGrupoFamilia text="Datos del integrante" />
            <div className="button-container">
                <AddMember />
                <Register />
            </div>
        </section>
    )
}