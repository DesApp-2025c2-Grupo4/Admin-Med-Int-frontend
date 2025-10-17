import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
import { FormGrupoFamilia } from "../Nuevo/FormGrupoFamilia/FormGrupoFamilia.jsx"
import { AddMember } from "../../../components/ui/AddMember/AddMember.jsx"
import { Register } from "../../../components/ui/Register/Register.jsx"
import { FormAgregarIntegrante } from "./ui/FormAgregarIntegrante.jsx"
export function AgregarIntegrante(){
    return (
        <section className="section__nuevo-grupo-familiar-container box-border">
            <TitleSection text={`Grupo ${222222} | Agregar Integrante`} />
            <FormAgregarIntegrante component={AddMember}/>
        </section>
    )
}