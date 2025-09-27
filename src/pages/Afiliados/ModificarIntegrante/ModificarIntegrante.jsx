 import { TitleSection } from "../../../components/TitleSections/TitleSection.jsx"
 import  { FormModificarIntegrante } from "./FormModificarIntegrante/FormModificarIntegrante.jsx" 
 import { AddMember } from "../../../components/ui/AddMember/AddMember.jsx"
 import { Register } from "../../../components/ui/Register/Register.jsx"
 export function ModificarIntegrante(){
     return (
         <section className="section__modificar-integrante-container box-border">
             <TitleSection text="Modificar Integrante" />
             <FormModificarIntegrante text="Datos del integrante" />
             <div className="button-container">
                 <AddMember />
                 <Register />
             </div>
         </section>
     )
 }