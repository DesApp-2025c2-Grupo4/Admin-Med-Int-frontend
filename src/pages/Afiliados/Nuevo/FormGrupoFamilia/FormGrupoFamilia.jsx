import './FormGrupoFamilia.css'
import { InputText  } from "../../../../components/ui/Input/InputText/InputText.jsx"
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx"
import { InputTipoDoc } from "../../../../constants/Inputs/InputTipoDoc.js" 
import { InputPlanMedico } from "../../../../constants/Inputs/InputPlanMedico.js"
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx"
import { CalendarButton } from '../../../../components/ui/CalendarButton/CalendarButton.jsx'
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import { AddMember } from "../../../../components/ui/AddMember/AddMember.jsx"
import { RegisterGroup } from "../../../../components/ui/RegisterGroup/RegisterGroup.jsx"
import { InputCalendar } from '../../../../components/ui/Input/InputCalendar/InputCalendar.jsx'
import './FormGrupoFamilia.css'

export function FormGrupoFamilia() {
    return (
        <form className="form-grupo-familia">
            <SubTitleSection text="Datos del titular" />
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
                    <InputCalendar text="fecha" className="input-calendar"/>
                </div>
                <div className="checkbox-group">
                    <label>
                        <input type="radio" name='situacion' />
                        Crónico
                    </label>
                    <label>
                        <input type="radio" name='situacion' />
                        Duración indefinida
                    </label>
                </div>
            </div>
            <div className="button-container">
                <AddMember />
                <RegisterGroup />
            </div>
        </form>
    )
}

