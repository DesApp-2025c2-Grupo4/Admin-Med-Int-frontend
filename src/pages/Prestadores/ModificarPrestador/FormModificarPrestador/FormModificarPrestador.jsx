import React, { useState } from 'react';
import './FormModificarPrestador.css'; 
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx";
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx";
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx';
import { InputCheckbox } from '../../../../components/ui/Input/InputCheckbox/InputCheckbox.jsx';

export function FormModificarPrestador({ text, initialData }) {
    const [tipoPrestador, setTipoPrestador] = useState(
        initialData.tipoPrestador?.toLowerCase() === "centro" ? "centro" : "independiente"
    ); 

    const [currentTelefono, setCurrentTelefono] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentDireccion, setCurrentDireccion] = useState('');

    const [dataForm, setDataForm] = useState({
        cuilCuit: initialData.cuilCuit || '',
        nombreCompleto: `${initialData.nombre || ''} ${initialData.apellido || ''}`.trim(),
        lugarIndependiente: tipoPrestador === "independiente" ? initialData.lugarIndependiente || '' : '',
        lugarCentro: tipoPrestador === "centro" ? initialData.lugarCentro || '' : '',    
        telefonos: initialData.telefonos?.map(t => t.nro) || [],
        emails: initialData.email ? [initialData.email] : [],
        direcciones: initialData.direccion?.map(d => `${d.calle} ${d.nro}`) || [],
        medicinaGeneral: initialData.especialidad?.some(e => e.descripcion === "Medicina General") || false,
        psicologia: initialData.especialidad?.some(e => e.descripcion === "Psicología") || false,
        nutricion: initialData.especialidad?.some(e => e.descripcion === "Nutrición") || false,
        neurologia: initialData.especialidad?.some(e => e.descripcion === "Neurología") || false,
        oftalmologia: initialData.especialidad?.some(e => e.descripcion === "Oftalmología") || false,
        urologia: initialData.especialidad?.some(e => e.descripcion === "Urología") || false,
        cardiologia: initialData.especialidad?.some(e => e.descripcion === "Cardiología") || false,
        ginecologia: initialData.especialidad?.some(e => e.descripcion === "Ginecología") || false,
        kinesiologia: initialData.especialidad?.some(e => e.descripcion === "Kinesiología") || false,
        pediatria: initialData.especialidad?.some(e => e.descripcion === "Pediatría") || false,
        traumatologia: initialData.especialidad?.some(e => e.descripcion === "Traumatologia") || false,
        oncologia: initialData.especialidad?.some(e => e.descripcion === "Oncología") || false,
        psiquiatria: initialData.especialidad?.some(e => e.descripcion === "Psiquiatría") || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setDataForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleTipoPrestadorChange = (e) => {
        const selectedType = e.target.value;
        setTipoPrestador(selectedType);
        setDataForm((prev) => ({
            ...prev,
            lugarIndependiente: selectedType === 'centro' ? '' : prev.lugarIndependiente,
            lugarCentro: selectedType === 'independiente' ? '' : prev.lugarCentro,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del Prestador:", dataForm, "Tipo de Prestador:", tipoPrestador);
    };

    return (
        <form className="form-modificar-prestador" onSubmit={handleSubmit}> 
            <SubTitleSection text={text} className="form-title" /> 
            <SubTitleSection text="Informacion basica" className="section-subtitle" />
            <div className="form-row basic-info">
                <InputText text="CUIL/CUIT"
                    name="cuilCuit"
                    value={dataForm.cuilCuit}
                    handleChange={handleChange} 
                />
                <InputText text="Nombre completo"
                    name="nombreCompleto"
                    value={dataForm.nombreCompleto}
                    handleChange={handleChange}
                />
            </div>

            <SubTitleSection text="Tipo de prestador" />
            <div className="form-section"> 
                <div className="radio-group-horizontal"> 
                    <label className="radio-label-with-input">
                        <input
                            type="radio"
                            name='tipoPrestador'
                            value="independiente"
                            checked={tipoPrestador === 'independiente'}
                            onChange={handleTipoPrestadorChange}
                        />
                        Profesional independiente
                        {tipoPrestador === 'independiente' && (
                            <InputText 
                                name="lugarIndependiente"
                                value={dataForm.lugarIndependiente}
                                handleChange={handleChange}
                                placeholder="Lugar..." 
                                customClass="input-lugar" 
                            />
                        )}
                    </label>
                    
                    <label className="radio-label-with-input">
                        <input
                            type="radio"
                            name='tipoPrestador'
                            value="centro"
                            checked={tipoPrestador === 'centro'}
                            onChange={handleTipoPrestadorChange}
                        />
                        Centro medico
                        {tipoPrestador === 'centro' && (
                            <InputText 
                                name="lugarCentro"
                                value={dataForm.lugarCentro}
                                handleChange={handleChange}
                                placeholder="Lugar..." 
                                customClass="input-lugar" 
                            />
                        )}
                    </label>
                </div>
            </div>

            <SubTitleSection text="Especialidades" className="section-subtitle" />
            <div className='checkbox-container-modificar-prestador'>
                <InputCheckbox label="Medicina General" name="medicinaGeneral" checked={dataForm.medicinaGeneral} onChange={handleChange} />
                <InputCheckbox label="Psicología" name="psicologia" checked={dataForm.psicologia} onChange={handleChange} />
                <InputCheckbox label="Nutrición" name="nutricion" checked={dataForm.nutricion} onChange={handleChange} /> 
                <InputCheckbox label="Ginecología" name="ginecologia" checked={dataForm.ginecologia} onChange={handleChange} />
                <InputCheckbox label="Psiquiatría" name="psiquiatria" checked={dataForm.psiquiatria} onChange={handleChange} />
                <InputCheckbox label="Neurología" name="neurologia" checked={dataForm.neurologia} onChange={handleChange} />
                <InputCheckbox label="Oftalmología" name="oftalmologia" checked={dataForm.oftalmologia} onChange={handleChange} />
                <InputCheckbox label="Urología" name="urologia" checked={dataForm.urologia} onChange={handleChange} />
                <InputCheckbox label="Kinesiología" name="kinesiologia" checked={dataForm.kinesiologia} onChange={handleChange} /> 
                <InputCheckbox label="Cardiología" name="cardiologia" checked={dataForm.cardiologia} onChange={handleChange} />
                <InputCheckbox label="Pediatría" name="pediatria" checked={dataForm.pediatria} onChange={handleChange} />
                <InputCheckbox label="Traumatología" name="traumatologia" checked={dataForm.traumatologia} onChange={handleChange} />
                <InputCheckbox label="Oncología" name="oncologia" checked={dataForm.oncologia} onChange={handleChange} />
            </div>
        
            <SubTitleSection text="Información de contacto" className="section-subtitle" />
            <div className="form-contacto-section">
                <div className="input-with-button-container">
                    <InputText text="Teléfono"
                        name="currentTelefono"
                        value={currentTelefono}
                        handleChange={(e) => setCurrentTelefono(e.target.value)}
                        placeholder="11-3488-7495"
                    />
                    <AddButton onClick={addTelefono} className="button-add" />
                    <div className="saved-items-container">
                        {dataForm.telefonos.map((tel, index) => (
                            <ContactCard key={`tel-${index}`} texto={tel} />
                        ))}
                    </div>
                </div>
                <div className="input-with-button-container">
                    <InputText text="Email"
                        name="currentEmail"
                        value={currentEmail}
                        handleChange={(e) => setCurrentEmail(e.target.value)}
                        placeholder="email.ejemplo@gmail.com"
                    />
                    <AddButton onClick={addEmail} className="button-add" />
                    <div className="saved-items-container">
                        {dataForm.emails.map((email, index) => (
                            <ContactCard key={`email-${index}`} texto={email} />
                        ))}
                    </div>
                </div>
            </div>
        
            <SubTitleSection text="Lugares de atención" className="section-subtitle" />
            <div className="form-places-section">
                <div className="input-with-button-container">
                    <InputText text="Dirección"
                        name="currentDireccion"
                        value={currentDireccion}
                        handleChange={(e) => setCurrentDireccion(e.target.value)}
                        placeholder="Calle Ejemplo 123"
                    />
                    <AddButton onClick={addDireccion} className="button-add"/>
                    <div className="saved-items-container">
                        {dataForm.direcciones.map((dir, index) => (
                            <ContactCard key={`dir-${index}`} texto={dir} />
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}