import React, { useState } from 'react';
import './FormModificarPrestador.css'; 
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx";
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx";
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx';
import { InputCheckbox } from '../../../../components/ui/Input/InputCheckbox/InputCheckbox.jsx';
import { RegisterGroup } from '../../../../components/ui/RegisterGroup/RegisterGroup.jsx';
import { updatePrestadorService } from '../../../../services/prestadores/modificarPrestador.js';
import { useDataFormPrestadores } from '../../../../hooks/Formularios/useDataFormPrestadores.jsx'
import { InputSelect } from '../../../../components/ui/Input/InputSelect/InputSelect.jsx';

export function FormModificarPrestador({ text, initialData }) {
    console.log(initialData);
    const { errorDataForm, datosParaFormulario, loadingDataForm } = useDataFormPrestadores();
    // Determina el tipo de prestador inicial
    const [tipoPrestador, setTipoPrestador] = useState(() => {
        const tipo = initialData.tipoPrestador?.toLowerCase() || '';
        if (tipo.includes("centro")) {
            return "centro";
        }
        return "independiente"; 
    });

    const [currentTelefono, setCurrentTelefono] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentDireccion, setCurrentDireccion] = useState('');
    const [currentCodigoPostal, setCurrentCodigoPostal] = useState('');

    // Estados de error
    const [errorCuilCuit, setErrorCuilCuit] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    // Funciones de validación
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidTelefono = (telefono) => /^[\d\s\-\(\)]+$/.test(telefono.trim().replace(/\s/g, ''));
    const isValidCuilCuit = (cuilCuit) => /^\d{2}-\d{8}-\d{1}$/.test(cuilCuit);

    const isInitialIndependent = tipoPrestador === 'independiente';

    // Inicializa dataForm con los datos que vienen por prop
    const [dataForm, setDataForm] = useState({
        prestadorId: initialData.prestadorId, 
        cuilCuit: initialData.cuilCuit || '',
        nombreCompleto: `${initialData.nombre || ''} ${initialData.apellido || ''}`.trim(),
        asociadoDe: isInitialIndependent && initialData.asociadoDe ? initialData.asociadoDe : '', 
        telefonos: initialData.telefonos?.map(t => t.nroTelefono) || [],
        emails: initialData.email?.map(e => e.descripcion) || [],
        direcciones: initialData.direccion?.map(d => ({
            calle: `${d.calle || ''} ${d.nro || ''}`.trim(),
            codigoPostal: d.codigoPostal 
        })) || [],
        especialidades: initialData.especialidad?.map(e => e.especialidadId) || []
    });

    const centrosFormateados = [
        { id: "", descripcion: "Ninguno" }, 
        ...(datosParaFormulario?.centrosMedicos.map(centro => ({
            id: centro.prestadorId, 
            descripcion: centro.nombre 
        })) || [])
    ];

    const handleChangeCheckbox = (especialidadId) => {
        setDataForm((prev) => {
            const yaTiene = prev.especialidades.includes(especialidadId);
            return {
                ...prev,
                especialidades: yaTiene
                ? prev.especialidades.filter(id => id !== especialidadId)
                : [...prev.especialidades, especialidadId],
            };
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;

        if (name === 'asociadoDe' && value !== "") {
            newValue = Number(value); 
        } else if (type === 'checkbox') {
            newValue = checked;
        }

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
            asociadoDe: '', 
        }));
    };

    const addTelefono = () => {
    setErrorTelefono('');

    if (!currentTelefono.trim()) {
        setErrorTelefono('El teléfono no puede estar vacío.');
        return;
    }

    if (!isValidTelefono(currentTelefono)) {
        setErrorTelefono('El teléfono contiene caracteres inválidos.');
        return;
    }

    if (dataForm.telefonos.includes(currentTelefono.trim())) {
        setErrorTelefono('Ese teléfono ya fue agregado.');
        return;
    }

    setDataForm((prev) => ({
        ...prev,
        telefonos: [...prev.telefonos, currentTelefono.trim()],
    }));
    setCurrentTelefono('');
    };
    
    const addEmail = () => {
    setErrorEmail('');

    if (!currentEmail.trim()) {
        setErrorEmail('El email no puede estar vacío.');
        return;
    }

    if (!isValidEmail(currentEmail)) {
        setErrorEmail('El formato del email es inválido.');
        return;
    }

    if (dataForm.emails.includes(currentEmail.trim())) {
        setErrorEmail('Ese email ya fue agregado.');
        return;
    }

    setDataForm((prev) => ({
        ...prev,
        emails: [...prev.emails, currentEmail.trim()],
    }));
    setCurrentEmail('');
    };
    const addDireccion = () => {
        if (currentDireccion.trim() !== '' && currentCodigoPostal.trim() !== '') {
            const nuevaDireccion = {
                calle: currentDireccion.trim(),
                codigoPostal: currentCodigoPostal.trim(),
            };
            setDataForm((prev) => ({
                ...prev,
                direcciones: [...prev.direcciones, nuevaDireccion],
            }));
            setCurrentDireccion('');
            setCurrentCodigoPostal(''); 
        } else {
             alert('Por favor, ingrese tanto la dirección como el código postal.');
        }
    };

    const removeDireccion = (dirToRemove) => {
        setDataForm(prev => ({
            ...prev,
            direcciones: prev.direcciones.filter(dir => 
                dir.calle !== dirToRemove.calle || dir.codigoPostal !== dirToRemove.codigoPostal
            ),
        }));
    };

    const removeItem = (arrName, itemToRemove) => {
        setDataForm(prev => ({
            ...prev,
            [arrName]: prev[arrName].filter(item => item !== itemToRemove),
        }));
    };
  
    const removeTelefono = (tel) => removeItem('telefonos', tel);
    const removeEmail = (email) => removeItem('emails', email);


    const handleUpdate = async () => {
        setErrorCuilCuit('');
    
        const prestadorId = initialData.prestadorId;
        if (!prestadorId) {
            console.error("No se encontró el ID del prestador para actualizar.");
            alert("Error: ID del prestador no disponible.");
            return;
        }

        let asociadoDeId = null;

        if (tipoPrestador === 'independiente' && dataForm.asociadoDe) {
            asociadoDeId = Number(dataForm.asociadoDe); 
        }

        if (!isValidCuilCuit(dataForm.cuilCuit.trim())) {
            setErrorCuilCuit('El CUIL/CUIT debe tener el formato XX-XXXXXXXX-X (ej: 20-12345678-9).');
            return;
        }

    const bodyToSend = {
        cuilCuit: dataForm.cuilCuit,
        tipoPrestador: tipoPrestador === 'independiente' ? 'Independiente' : 'Centro Médico',
        asociadoDe: asociadoDeId, 
        nombreCompleto: dataForm.nombreCompleto,
        telefonos: dataForm.telefonos,
        emails: dataForm.emails,
        direcciones: dataForm.direcciones, 
        especialidades: dataForm.especialidades 
    };

    try {

        const result = await updatePrestadorService(bodyToSend, tipoPrestador, prestadorId);
        
        console.log('Prestador actualizado con éxito:', result);
        alert('Cambios guardados exitosamente.');
    } catch (error) {
        console.error('Error al guardar los cambios:', error.message);
        alert(`Error al guardar: ${error.message}`);
    }
};
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();
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
                    error={errorCuilCuit}
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
                    <div className="radio-option-group">
                        <label className="radio-label-simple">
                            <input
                                type="radio"
                                name='tipoPrestador'
                                value="independiente"
                                checked={tipoPrestador === 'independiente'}
                                onChange={handleTipoPrestadorChange} 
                            />
                            Profesional independiente
                        </label>

                        {tipoPrestador === 'independiente' && (
                            loadingDataForm ? (
                                <p>Cargando centros...</p>
                            ) : errorDataForm ? (
                                <p style={{color: 'red'}}>Error al cargar centros.</p>
                            ) : (
                                <InputSelect 
                                    text="Asociado al Centro" 
                                    name="asociadoDe" 
                                    value={dataForm.asociadoDe} 
                                    handleChange={handleChange}
                                    listaDeOpciones={centrosFormateados} 
                                    requerido={false} 
                                    customClass="input-lugar-select" 
                                />
                            )
                        )}
                    </div>
        
                    <div className="radio-option-group">
                        <label className="radio-label-simple">
                            <input
                                type="radio"
                                name='tipoPrestador'
                                value="centro"
                                checked={tipoPrestador === 'centro'}
                                onChange={handleTipoPrestadorChange} 
                            />
                            Centro medico
                        </label>
                    </div>
                </div>
            </div>

            <SubTitleSection text="Especialidades" className="section-subtitle" />
            <div className='checkbox-container-modificar-prestador'>
                {loadingDataForm ? (
                    <p>Cargando especialidades disponibles...</p>
                ) : errorDataForm ? (
                    <p style={{color: 'red'}}>Error al cargar especialidades.</p>
                ) : (
                    datosParaFormulario?.especialidades.map(e => (
                        <InputCheckbox 
                            key={e.especialidadId}
                            label={e.descripcion}
                            name={e.descripcion}
                            checked={dataForm.especialidades.includes(e.especialidadId)}
                            onChange={() => handleChangeCheckbox(e.especialidadId)} 
                        />
                    ))
                )}
            </div>
            
            <SubTitleSection text="Información de contacto" className="section-subtitle" />
            <div className="form-contacto-section">
                <div className="input-with-button-container">
                    <InputText text="Teléfono"
                        name="currentTelefono"
                        value={currentTelefono}
                        handleChange={(e) => setCurrentTelefono(e.target.value)}
                        placeholder="11-3488-7495"
                        error={errorTelefono}
                    />
                    <AddButton onClick={addTelefono} className="button-add" />
                    <div className="saved-items-container">
                        {dataForm.telefonos.map((tel, index) => (
                            <ContactCard key={`tel-${index}`} texto={tel} onDelete={() => removeTelefono(tel)}/>
                        ))}
                    </div>
                </div>
                <div className="input-with-button-container">
                    <InputText text="Email"
                        name="currentEmail"
                        value={currentEmail}
                        handleChange={(e) => setCurrentEmail(e.target.value)}
                        placeholder="email.ejemplo@gmail.com"
                        error={errorEmail}
                    />
                    <AddButton onClick={addEmail} className="button-add" />
                    <div className="saved-items-container">
                        {dataForm.emails.map((email, index) => (
                            <ContactCard key={`email-${index}`} texto={email} onDelete={() => removeEmail(email)} />
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
                    <InputText text="Codigo postal"
                        name="currentCodigoPostal" 
                        value={currentCodigoPostal} 
                        handleChange={(e) => setCurrentCodigoPostal(e.target.value)}
                        placeholder="C1000AAB"
                    />
                    <AddButton onClick={addDireccion} className="button-add"/>
                    <div className="saved-items-container">
                        {dataForm.direcciones.map((dir, index) => (
                            <ContactCard 
                                key={`dir-${index}`} 
                                texto={dir} 
                                onDelete={() => removeDireccion(dir)} 
                                isDireccion={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="modificar-prestador-button">
                <RegisterGroup text={'Guardar Cambios'} type="submit"/>
            </div>
        </form>
    );
}