import './FormModificarIntegrante.css'
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx"
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx"
import { InputTipoDoc } from "../../../../constants/Inputs/InputTipoDoc.js" 
import { InputPlanMedico } from "../../../../constants/Inputs/InputPlanMedico.js"
import { InputSituacionesTerapeuticas } from "../../../../constants/Inputs/InputSituacionesTerapeuticas.js"
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx"
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import { InputCalendar } from '../../../../components/ui/Input/InputCalendar/InputCalendar.jsx'
import { useState } from 'react'
import { SituacionCard } from '../../../../components/ui/Cards/SituacionCard/SituacionCard.jsx'
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx'
import { SaveButton } from "../../../../components/ui/SaveButton/SaveButton.jsx"

export function FormModificarIntegrante({ text, initialData }) {
    
    const [newSituacion, setNewSituacion] = useState("");
    const [isIndefinida, setIsIndefinida] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(null); 
    const [fechaFinal, setFechaFinal] = useState(null);
    const [currentTelefono, setCurrentTelefono] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentDireccion, setCurrentDireccion] = useState('');
    const [tieneSituacion, setTieneSituacion] = useState(false);

    const [dataForm, setDataForm] = useState({
        nombre: initialData.nombre || '',
        apellido: initialData.apellido || '',
        tipoDocumento: initialData.tipoDocumento?.tipoDocId || 1,
        nroDocumento: initialData.dni || '',
        planMedico: initialData.planMedico?.planId || 1,
        fechaNacimiento: initialData.fechaNacimiento || '',
        telefonos: initialData.telefonos?.map(t => ({ id: t.telefonoId, descripcion: t.nroTelefono })) || [],
        emails: initialData.mail?.map(m => ({ id: m.id, descripcion: m.descripcion })) || [],
        direcciones: initialData.direcciones?.map(d => ({ id: d.direccionId, descripcion: `${d.calle} ${d.nro}` })) || [],
        situacionesTerapeuticas: initialData.situacionesTerapeuticas?.map(s => ({
            id: s.situacionId,
            descripcion: s.descripcion,
            esCronica: s.esCronica,
            fechaInicio: s.fechaInicio,
            fechaFinal: s.fechaFin
        })) || []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Agregar contacto
    const addTelefono = () => {
        if (currentTelefono.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                telefonos: [...prev.telefonos, { id: Date.now(), descripcion: currentTelefono.trim() }],
            }));
            setCurrentTelefono(''); 
        }
    };
    const addEmail = () => {
        if (currentEmail.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                emails: [...prev.emails, { id: Date.now(), descripcion: currentEmail.trim() }],
            }));
            setCurrentEmail(''); 
        }
    };
    const addDireccion = () => {
        if (currentDireccion.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                direcciones: [...prev.direcciones, { id: Date.now(), descripcion: currentDireccion.trim() }],
            }));
            setCurrentDireccion(''); 
        }
    };

    //  Eliminar contacto
    const removeTelefono = (id) => {
        setDataForm((prev) => ({
            ...prev,
            telefonos: prev.telefonos.filter((t) => t.id !== id),
        }));
    };
    const removeEmail = (id) => {
        setDataForm((prev) => ({
            ...prev,
            emails: prev.emails.filter((m) => m.id !== id),
        }));
    };
    const removeDireccion = (id) => {
        setDataForm((prev) => ({
            ...prev,
            direcciones: prev.direcciones.filter((d) => d.id !== id),
        }));
    };

    // Situaciones terapéuticas
    const addSituacion = () => {
        if (newSituacion === "" || newSituacion === null) return;

        const situacionSeleccionada = InputSituacionesTerapeuticas.find(
            (s) => s.id === parseInt(newSituacion, 10)
        );
        if (!situacionSeleccionada) return;

        const newSituacionObject = {
            id: Date.now(), // Generamos ID único localmente
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

    // Eliminar situación terapéutica
    const removeSituacion = (id) => {
        setDataForm((prev) => ({
            ...prev,
            situacionesTerapeuticas: prev.situacionesTerapeuticas.filter((s) => s.id !== id),
        }));
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

    // Enviar actualización al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/integrantes/${initialData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataForm),
            });
            if (!response.ok) throw new Error("Error al actualizar integrante");
            alert("Integrante actualizado con éxito");
        } catch (error) {
            console.error(error);
            alert("Hubo un error al actualizar");
        }
    };

    return (
        <form className="form-modificar-integrante" onSubmit={handleSubmit}>
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
                        {dataForm.telefonos.map((tel) => (
                            <ContactCard 
                                key={tel.id} 
                                texto={tel.descripcion} 
                                onDelete={() => removeTelefono(tel.id)} 
                            />
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
                        {dataForm.emails.map((email) => (
                            <ContactCard 
                                key={email.id} 
                                texto={email.descripcion} 
                                onDelete={() => removeEmail(email.id)} 
                            />
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
                        {dataForm.direcciones.map((dir) => (
                            <ContactCard 
                                key={dir.id} 
                                texto={dir.descripcion} 
                                onDelete={() => removeDireccion(dir.id)} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            <SubTitleSection text="Situaciones terapéuticas" />
            <div className="form-situaciones">
                <div className="input-with-button">
                    <InputSelect
                        text="Situación"
                        name="situaciones"
                        listaDeOpciones={InputSituacionesTerapeuticas}
                        value={newSituacion}
                        handleChange={(e) => setNewSituacion(e.target.value)}
                    />
                    <InputCalendar
                        text="Fecha inicio"
                        name="fechaInicio"
                        value={fechaInicio}
                        handleChange={(e) => setFechaInicio(e.target.value)}
                    />
                    <InputCalendar
                        text="Fecha final"
                        name="fechaFinal"
                        value={fechaFinal}
                        handleChange={(e) => setFechaFinal(e.target.value)}
                    />
                    <AddButton onClick={addSituacion} />
                </div>

                <div className="saved-items-container">
                    {dataForm.situacionesTerapeuticas.map((sit) => (
                        <SituacionCard
                            key={sit.id}
                            situacion={sit}
                            onDelete={() => removeSituacion(sit.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="button-container">
                <SaveButton />
            </div>
        </form>
    )
}
