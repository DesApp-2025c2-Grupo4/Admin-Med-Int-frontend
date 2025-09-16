import './FormGrupoFamilia.css'
import { InputText  } from "../../../../components/ui/Input/InputText/InputText.jsx"
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx"
import { InputTipoDoc } from "../../../../constants/Inputs/InputTipoDoc.js" 
import { InputPlanMedico } from "../../../../constants/Inputs/InputPlanMedico.js"
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx"
import { CalendarButton } from '../../../../components/ui/CalendarButton/CalendarButton.jsx'
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import './FormGrupoFamilia.css'

export function FormGrupoFamilia() {
    return (
        <form className="form-grupo-familia">
            <div className="form-row">
                <InputSelect text="Tipo de documento" listaDeOpciones={InputTipoDoc}/>
                <InputText text="Numero de documento"/>
                <InputText text="Nombres"/>
            </div>

            <div className="form-row">
                <InputText text="Apellidos"/>
                <InputDate text="Fecha de nacimiento" name="fecha-de-nacimiento" />
                <InputSelect text="Plan medico" listaDeOpciones={InputPlanMedico}/>
            </div>

            <SubTitleSection text="Información de contacto" />

            <div className="form-contacto">
                <div className="input-with-button">
                    <InputText text="Teléfono"/>
                    <AddButton />
                </div>
                <div className="input-with-button">
                    <InputText text="Email"/>
                    <AddButton />
                </div>
                <div className="input-with-button">
                    <InputText text="Dirección"/>
                    <AddButton />
                </div>
            </div>

            <SubTitleSection text="Situaciones terapéuticas" />

            {/* SITUACIONES */}
            <div className="form-column">
                <div className="input-with-button">
                    <InputText text="Situaciones terapéuticas" />
                    <AddButton />
                    <CalendarButton />
                </div>
                <div className="checkboxes">
                    <input type="checkbox" id="cronico" value="Cronico"/>
                    <label htmlFor="cronico">Crónico</label>
                    <input type="checkbox" id="indefinido" value="Duracion indefinida"/>
                    <label htmlFor="indefinido">Duración indefinida</label>
                </div>
            </div>
        </form>
    )
}

