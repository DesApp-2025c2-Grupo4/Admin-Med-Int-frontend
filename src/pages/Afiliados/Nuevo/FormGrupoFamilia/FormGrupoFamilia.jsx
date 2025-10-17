import './FormGrupoFamilia.css'
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx"
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx"
import { InputTipoDoc } from "../../../../constants/Inputs/InputTipoDoc.js" 
import { InputPlanMedico } from "../../../../constants/Inputs/InputPlanMedico.js"
import { InputSituacionesTerapeuticas } from "../../../../constants/Inputs/InputSituacionesTerapeuticas.js"
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx"
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import './FormGrupoFamilia.css'
import { useState } from 'react'
import { SituacionCard } from '../../../../components/ui/Cards/SituacionCard/SituacionCard.jsx'
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx'
import { formatearTelefono } from '../../../../utils/formatearNumeroDeTelefono.js'
export function FormGrupoFamilia({text, component, funcionSubmit}) {
    //Creo el boton
    const ButtonComponent = component
    const [newSituacion, setNewSituacion] = useState("1"); 
    const [isIndefinida, setIsIndefinida] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(''); 
    const [fechaFin, setFechaFin] = useState('');
    const [currentTelefono, setCurrentTelefono] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentDireccion, setCurrentDireccion] = useState('');
    const [tieneSituacion, setTieneSituacion] = useState(false);
    const [dataForm,setDataForm] = useState({
        nombre:'',
        apellido: '',
        tipoDocId: 1,
        dni:'',
        planId: 1,
        fechaNacimiento: '',
        telefonos: [],
        emails:[],
        direcciones: [],
        situacionesTerapeuticas:[],
        parentensco:'Hermano'
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleDeleteItem = (listName, itemToDelete) => {
        const normalizedItemToDelete = itemToDelete.trim().toUpperCase();
        setDataForm(prev => ({
            ...prev,
            [listName]: prev[listName].filter(item => 
                item.trim().toUpperCase() !== normalizedItemToDelete
            ),
        }));
    };
    const deleteTelefono = (telefono) => handleDeleteItem('telefonos', telefono);
    const deleteEmail = (email) => handleDeleteItem('emails', email);
    const deleteDireccion = (direccion) => handleDeleteItem('direcciones', direccion);
    const deleteSituacion = (id) => {
        setDataForm(prev => ({
            ...prev,
            situacionesTerapeuticas: prev.situacionesTerapeuticas.filter(s => s.situacionId !== id)
        }));
    };

    const addTelefono = () => {
        const telefonoLimpio = currentTelefono.trim();
        if (telefonoLimpio === '') return;
        const isDuplicado = dataForm.telefonos.some(
            (telGuardado) => telGuardado.trim() === telefonoLimpio
        );
        if (isDuplicado) {
            return;
        }
        setDataForm((prev) => ({
            ...prev,
            telefonos: [...prev.telefonos, telefonoLimpio],
        }));
        setCurrentTelefono(''); 
    };

    const addEmail = () => {
        const emailLimpio = currentEmail.trim().toUpperCase();
        if (emailLimpio === '') return;
        const isDuplicado = dataForm.emails.some(
            (emailGuardado) => emailGuardado.trim().toUpperCase() === emailLimpio
        );
        if (isDuplicado) {
            return;
        }
        setDataForm((prev) => ({
            ...prev,
            emails: [...prev.emails, currentEmail.trim()], 
        }));
        setCurrentEmail(''); 
    };

    const addDireccion = () => {
        const direccionLimpia = currentDireccion.trim().toUpperCase();
        if (direccionLimpia === '') return;
        const isDuplicado = dataForm.direcciones.some(
            (dirGuardada) => dirGuardada.trim().toUpperCase() === direccionLimpia
        );
        if (isDuplicado) {
            return;
        }
        setDataForm((prev) => ({
            ...prev,
            direcciones: [...prev.direcciones, currentDireccion.trim()],
        }));
        setCurrentDireccion(''); 
    };

    const addSituacion = () => {
        if (newSituacion === "" || newSituacion === null) {
            return;
        }
        const situacionSeleccionada = InputSituacionesTerapeuticas.find(
            (s) => s.id === parseInt(newSituacion, 10)
        );
        if (!situacionSeleccionada) return;
        const isCronica = !isIndefinida; 
        if (!isCronica) { 
            if (!fechaInicio || !fechaFin) {
                return;     
            }
        }
        const isDuplicada = dataForm.situacionesTerapeuticas.some(
            (s) => s.situacionId === situacionSeleccionada.id
        );
        if (isDuplicada) {

            return; 
        }

        const newSituacionObject = {
            situacionId: situacionSeleccionada.id,
            descripcion: situacionSeleccionada.descripcion,
            esCronica: isCronica,
            fechaInicio: isCronica ? null : fechaInicio,
            fechaFin: isCronica ? null : fechaFin
        };
        setDataForm((prev) => ({
            ...prev,
            situacionesTerapeuticas: [
                ...prev.situacionesTerapeuticas,
                newSituacionObject,
            ],
        }));
        setFechaInicio('');
        setFechaFin('');
    };
    const handleSituacionTypeChange = (e) => {
        const isIndefinidaSelected = e.target.value === 'indefinida';
        setIsIndefinida(isIndefinidaSelected); 
    };


    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log("Datos listos para enviar al backend:", dataForm);
    };

    return (
        <form className="form-grupo-familia" onSubmit={handleSubmit}>
            <SubTitleSection text={text} />
            <div className="form-row">
                <InputSelect 
                    text="Tipo de documento" 
                    name='tipoDocId'
                    listaDeOpciones={InputTipoDoc}
                    handleChange={handleChange}
                    value={dataForm.tipoDocId} />
                <InputText text="Numero de documento"
                    name="dni"
                    value={dataForm.dni}
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
                    name='planId'
                    listaDeOpciones={InputPlanMedico}
                    value={dataForm.planId}
                    handleChange={handleChange} />
            </div>
            <div className='form-row'>
                <InputText
                    text={'Parentesco'}
                    name={'parentensco'}
                    value={dataForm.parentensco}
                    handleChange={handleChange}
                />
            </div>

            <SubTitleSection text="Información de contacto" />

            <div className="form-contacto">
                {/* TELÉFONOS */}
                <div className="input-with-button">
                    <InputText text="Teléfono"
                        name="telefonos"
                        value={currentTelefono}
                        handleChange={(e) => setCurrentTelefono(e.target.value)}/>
                    <AddButton onClick={addTelefono} className="button-add" />
                       <div className="saved-items-container">
                        {dataForm.telefonos.map((tel, index) => (
                            <ContactCard 
                                key={`tel-${index}`} 
                                texto={formatearTelefono(tel)} 
                                onDelete={() => deleteTelefono(tel)} 
                            />
                        ))}
                    </div>
                </div>
                {/* EMAILS */}
                <div className="input-with-button">
                    <InputText text="Email"
                        name="emails"
                        value={currentEmail}
                        handleChange={(e) => setCurrentEmail(e.target.value)} />
                    <AddButton onClick={addEmail} className="button-add" />
                    <div className="saved-items-container">
                        {dataForm.emails.map((email, index) => (
                            <ContactCard 
                                key={`email-${index}`} 
                                texto={email} 
                                onDelete={() => deleteEmail(email)} 
                            />
                        ))}
                    </div>
                </div>
                {/* DIRECCIONES */}
                <div className="input-with-button">
                    <InputText text="Dirección"
                        name="direcciones"
                        value={currentDireccion}
                        handleChange={(e) => setCurrentDireccion(e.target.value)} />
                    <AddButton onClick={addDireccion} className="button-add"/>
                    <div className="saved-items-container">
                        {dataForm.direcciones.map((dir, index) => (
                            <ContactCard 
                                key={`dir-${index}`} 
                                texto={dir} 
                                onDelete={() => deleteDireccion(dir)} 
                            />
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
                                    <InputDate 
                                        text="Fecha de inicio" 
                                        name="fechaInicio"
                                        required={true}
                                        value={fechaInicio}
                                        handleChange={(e) => setFechaInicio(e.target.value)} />
                                    <InputDate 
                                        text="Fecha de fin" 
                                        name="fechaFin"
                                        required={true} 
                                        value={fechaFin}
                                        handleChange={(e) => setFechaFin(e.target.value)} />
                                </>
                            )}
                        </div>
                        <AddButton onClick={addSituacion} className="button-add" />
                    </div>
                    
                    <div className="situaciones-list">
                        {dataForm.situacionesTerapeuticas.map((s, index) => (
                            <SituacionCard 
                                key={index} 
                                situacion={s}
                                onDelete={() => deleteSituacion(s.situacionId)} 
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="button-container">
                <div onClick={()=>funcionSubmit(dataForm)} style={{cursor:'pointer'}}>
                    <ButtonComponent />
                </div>
            </div>
        </form>
    )
}