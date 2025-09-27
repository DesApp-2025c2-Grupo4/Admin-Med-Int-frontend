//modificar para que me permita recibir datos 
//guiarse con detalleDePersona.jsx

import './FormGrupoFamilia.css'
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx"
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx"
import { InputTipoDoc } from "../../../../constants/Inputs/InputTipoDoc.js" 
import { InputPlanMedico } from "../../../../constants/Inputs/InputPlanMedico.js"
import { InputSituacionesTerapeuticas } from "../../../../constants/Inputs/InputSituacionesTerapeuticas.js"
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx"
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import { InputCalendar } from '../../../../components/ui/Input/InputCalendar/InputCalendar.jsx'
import './FormGrupoFamilia.css'
import { useState } from 'react'
import { SituacionCard } from '../../../../components/ui/Cards/SituacionCard/SituacionCard.jsx'
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx'

export function FormGrupoFamilia({text}) {
    const [newSituacion, setNewSituacion] = useState("");
    const [isIndefinida, setIsIndefinida] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(null); 
    const [fechaFinal, setFechaFinal] = useState(null);
    const [currentTelefono, setCurrentTelefono] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentDireccion, setCurrentDireccion] = useState('');
    const [tieneSituacion, setTieneSituacion] = useState(false);

    const [dataForm,setDataForm] = useState({
        nombre:'',
        apellido: '',
        tipoDocumento: 1,
        nroDocumento:'',
        planMedico: 1,
        fechaNacimiento: '',
        telefonos: [],
        emails:[],
        direcciones: [],
        situacionesTerapeuticas:[]
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addTelefono = () => {
        if (currentTelefono.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                telefonos: [...prev.telefonos, currentTelefono.trim()],
            }));
            setCurrentTelefono(''); 
        }
    };

    const addEmail = () => {
        if (currentEmail.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                emails: [...prev.emails, currentEmail.trim()],
            }));
            setCurrentEmail(''); 
        }
    };

    const addDireccion = () => {
        if (currentDireccion.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                direcciones: [...prev.direcciones, currentDireccion.trim()],
            }));
            setCurrentDireccion(''); 
        }
    };

    const addSituacion = () => {
        if (newSituacion === "" || newSituacion === null) {
            return;
        }

        const situacionSeleccionada = InputSituacionesTerapeuticas.find(
            (s) => s.id === parseInt(newSituacion, 10)
        );

        if (!situacionSeleccionada) return;

        const newSituacionObject = {
            idSituacion: situacionSeleccionada.id,
            descripcion: situacionSeleccionada.descripcion,
            esCronica: !isIndefinida,
            fechaInicio: isIndefinida ? fechaInicio : null,
            fechaFinal: isIndefinida ? fechaFinal : null
        };

        setDataForm((prev) => ({
            ...prev,
            situacionesTerapeuticas: [
                ...prev.situacionesTerapeuticas,
                newSituacionObject,
            ],
        }));

        setNewSituacion("");
        setFechaInicio(null);
        setFechaFinal(null);
    };

    const handleSituacionTypeChange = (e) => {
        const isIndefinidaSelected = e.target.value === 'indefinida';
        setIsIndefinida(isIndefinidaSelected);
    
        const updatedSituaciones = dataForm.situacionesTerapeuticas.map((s) => ({
            ...s,
            esCronica: !isIndefinidaSelected,
        }));
    
        setDataForm((prev) => ({
            ...prev,
            situacionesTerapeuticas: updatedSituaciones,
        }));
    };

    return (
        <form className="form-grupo-familia">
            <SubTitleSection text={text} />
            <div className="form-row">
                <InputSelect 
                    text="Tipo de documento" 
                    name='tipoDocumento'
                    listaDeOpciones={InputTipoDoc}
                    handleChange={handleChange}
                    value={dataForm.tipoDocumento} />
                <InputText text="Numero de documento"
                    name="nroDocumento"
                    value={dataForm.nroDocumento}
                    handleChange={handleChange} />
                <InputText text="Nombres"
                    name="nombre"
                    value={dataForm.nombre}
                    handleChange={handleChange} />
            </div>

            <div className="form-row">
                <InputText text="Apellidos"
                    name="apellido"
                    value={dataForm.apellido}
                    handleChange={handleChange}/>
                <InputDate 
                    text="Fecha de nacimiento" 
                    name="fechaNacimiento"
                    value={dataForm.fechaNacimiento}
                    handleChange={handleChange}
                    />
                <InputSelect text="Plan medico" 
                    name='planMedico'
                    listaDeOpciones={InputPlanMedico}
                    value={dataForm.planMedico}
                    handleChange={handleChange} />
            </div>

            <SubTitleSection text="Información de contacto" />

            <div className="form-contacto">
                <div className="input-with-button">
                    <InputText text="Teléfono"
                        name="telefonos"
                        value={currentTelefono}
                        handleChange={(e) => setCurrentTelefono(e.target.value)}/>
                    <AddButton onClick={addTelefono} className="button-add" />
                     <div className="saved-items-container">
                        {dataForm.telefonos.map((tel, index) => (
                            <ContactCard key={`tel-${index}`} texto={tel} />
                        ))}
                    </div>
                </div>
                <div className="input-with-button">
                    <InputText text="Email"
                        name="emails"
                        value={currentEmail}
                        handleChange={(e) => setCurrentEmail(e.target.value)} />
                    <AddButton onClick={addEmail} className="button-add" />
                    <div className="saved-items-container">
                        {dataForm.emails.map((email, index) => (
                            <ContactCard key={`email-${index}`} texto={email} />
                        ))}
                    </div>
                </div>
                <div className="input-with-button">
                    <InputText text="Dirección"
                        name="direcciones"
                        value={currentDireccion}
                        handleChange={(e) => setCurrentDireccion(e.target.value)} />
                    <AddButton onClick={addDireccion} className="button-add"/>
                    <div className="saved-items-container">
                        {dataForm.direcciones.map((dir, index) => (
                            <ContactCard key={`dir-${index}`} texto={dir} />
                        ))}
                    </div>
                </div>
            </div>

            <SubTitleSection text="Situaciones terapéuticas" />
            <div className="checkbox-group">
                <label>
                    <input 
                        type="radio" 
                        name='tieneSituacion' 
                        value="true"
                        checked={tieneSituacion === true}
                        onChange={(e) => setTieneSituacion(e.target.value === 'true')} />
                    Posee situación terapéutica
                </label>
                <label>
                    <input 
                        type="radio" 
                        name='tieneSituacion' 
                        value="false"
                        checked={tieneSituacion === false}
                        onChange={(e) => setTieneSituacion(e.target.value === 'true')} />
                    No posee situación terapéutica
                </label>
            </div>
            
            {tieneSituacion && (
                <div className="form-column">
                    <div className="input-with-button">
                        <InputSelect 
                            text="Situación terapéutica"
                            name="newSituacion"
                            listaDeOpciones={InputSituacionesTerapeuticas}
                            value={newSituacion}
                            handleChange={(e) => setNewSituacion(e.target.value)} />
                        <AddButton onClick={addSituacion} className="button-add" />
                        
                        <div className="radio-group-and-calendars">
                            <div className="checkbox-group">
                                <div className='checkbox-items' >
                                    <label>
                                        <input 
                                            type="radio" 
                                            name='situacion' 
                                            value="cronica"
                                            checked={!isIndefinida}
                                            onChange={handleSituacionTypeChange} />
                                        Crónico
                                    </label>
                                </div>
                                <div className="checkbox-items">
                                    <label>
                                        <input 
                                            type="radio" 
                                            name='situacion' 
                                            value="indefinida"
                                            checked={isIndefinida}
                                            onChange={handleSituacionTypeChange} />
                                        Duración indefinida
                                    </label>
                                </div>
                            </div>
                            
                            {isIndefinida && (
                                <>
                                    <InputCalendar 
                                        text="Fecha de inicio" 
                                        name="fechaInicio"
                                        required={true}
                                        value={fechaInicio}
                                        handleChange={(e) => setFechaInicio(e.target.value)} />
                                    <InputCalendar 
                                        text="Fecha de fin" 
                                        name="fechaFinal"
                                        required={true} 
                                        value={fechaFinal}
                                        handleChange={(e) => setFechaFinal(e.target.value)} />
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="situaciones-list">
                        {dataForm.situacionesTerapeuticas.map((s, index) => (
                            <SituacionCard key={index} situacion={s} />
                        ))}
                    </div>
                </div>
            )}
        </form>
    )
}