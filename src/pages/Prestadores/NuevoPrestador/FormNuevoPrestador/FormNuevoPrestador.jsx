import React, { useState } from 'react';
import './FormNuevoPrestador.css';
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx";
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx";
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx";
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx';
import { InputCheckbox } from '../../../../components/ui/Input/InputCheckbox/InputCheckbox.jsx';
import { Register } from '../../../../components/ui/Register/Register.jsx';
import { crearPrestador } from '../../../../services/prestadores/crearPrestador.js';
import { useDataFormPrestadores } from '../../../../hooks/Formularios/useDataFormPrestadores.jsx';
import { InputSelect } from '../../../../components/ui/Input/InputSelect/InputSelect.jsx';
import { useCambiarTitulo } from "../../../../hooks/useCambiarTitulo.jsx";
import { toast } from "react-toastify";
import { LoaderConTexto } from '../../../../components/LoaderConTexto/LoaderConTexto.jsx';
import { useNavigate } from 'react-router';
import { toastConSubtitulo } from '../../../../components/ToastConSubtitulo/ToastConSubtitulo.jsx';

export function FormNuevoPrestador({ text }) {
    const navigate = useNavigate()
    useCambiarTitulo({ title: "Nuevo Prestador" });
    const { errorDataForm, datosParaFormulario, loadingDataForm } = useDataFormPrestadores();

    const [tipoPrestador, setTipoPrestador] = useState('independiente'); 
    const [currentTelefono, setCurrentTelefono] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentDireccion, setCurrentDireccion ] = useState({
        calle:'',
        nro:null,
        codigoPostal: ''
    })

    // Estados para los mensajes de error
    const [errorCuilCuit, setErrorCuilCuit] = useState(''); 
    const [errorTelefono, setErrorTelefono] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    // Funciones de validacion 
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidTelefono = (telefono) => {
        const phoneRegex = /^[\d\s\-\(\)]+$/; 
        return phoneRegex.test(telefono.trim().replace(/\s/g, ''));
    };

    const isValidCuilCuit = (cuilCuit) => {
        // formato XX-XXXXXXXX-X 
        const cuitRegex = /^\d{2}-\d{8}-\d{1}$/; 
        return cuitRegex.test(cuilCuit);
    };

    const [dataForm, setDataForm] = useState({
        cuilCuit: '',
        nombreCompleto: '',
        asociadoDe: '',   
        telefonos: [],
        emails: [],
        direcciones: [],
        especialidades: []
    });

    const centrosFormateados = [
    { id: "", descripcion: "Ninguno" }, 
    ...(datosParaFormulario?.centrosMedicos.map(centro => ({
        id: centro.prestadorId, 
        descripcion: `${centro.nombre} ${centro.apellido}`
    })) || [])
];

    const handleChangeCheckbox = (especialidadId) => {
        const id = Number(especialidadId); 
        setDataForm((prev) => {
            const yaTiene = prev.especialidades.includes(id);
            return {
                ...prev,
                especialidades: yaTiene
                    ? prev.especialidades.filter(itemId => itemId !== id)
                    : [...prev.especialidades, id],
            };
        });
    };
    const handleChangeDireccion = (e)=>{
        const {name, value} = e.target
        setCurrentDireccion((prev) => ({
            ...prev,
            [name]:value
        }))
    } 
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDataForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === 'cuilCuit') {
            setErrorCuilCuit('');
        }
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
        const telefonoLimpio = currentTelefono.trim();

        if (telefonoLimpio === '') {
            setErrorTelefono('El campo de teléfono no puede estar vacío.');
            return;
        }

        if (!isValidTelefono(telefonoLimpio)) {
            setErrorTelefono('El teléfono solo debe contener números, guiones o paréntesis.');
            return;
        }
        
        if (dataForm.telefonos.includes(telefonoLimpio)) {
            setErrorTelefono('Este teléfono ya ha sido agregado.');
            return;
        }

        setDataForm((prev) => ({
            ...prev,
            telefonos: [...prev.telefonos, telefonoLimpio],
        }));
        setCurrentTelefono('');
    };

    const addEmail = () => {
        setErrorEmail(''); 
        const emailLimpio = currentEmail.trim();

        if (emailLimpio === '') {
            setErrorEmail('El campo de email no puede estar vacío.');
            return;
        }

        if (!isValidEmail(emailLimpio)) {
            setErrorEmail('Por favor, ingrese un formato de email válido (ej: nombre@dominio.com).');
            return;
        }
        
        if (dataForm.emails.includes(emailLimpio)) {
            setErrorEmail('Este email ya ha sido agregado.');
            return;
        }

        setDataForm((prev) => ({
            ...prev,
            emails: [...prev.emails, emailLimpio],
        }));
        setCurrentEmail('');
    };

    const addDireccion = () => {
        if (currentDireccion.calle.trim() !== '' 
        && currentDireccion.codigoPostal.trim() !== '') {
            setDataForm((prev) => ({
                ...prev,
                direcciones: [...prev.direcciones, currentDireccion],
            }));
            setCurrentDireccion('');
        } else {
            toast.error('Por favor, ingrese tanto la dirección como el código postal.')
        }
    };

    const removeTelefono = (telAEliminar) => {
        setDataForm((prev) => ({
            ...prev,
            telefonos: prev.telefonos.filter(tel => tel !== telAEliminar),
        }));
    };

    const removeEmail = (emailAEliminar) => {
        setDataForm((prev) => ({
            ...prev,
            emails: prev.emails.filter(email => email !== emailAEliminar),
        }));
    };

    const removeDireccion = (dirAEliminar) => {
        setDataForm((prev) => ({
            ...prev,
            direcciones: prev.direcciones.filter(dir => 
                dir.calle !== dirAEliminar.calle || dir.codigoPostal !== dirAEliminar.codigoPostal
            ),
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorCuilCuit(''); 

        if (!isValidCuilCuit(dataForm.cuilCuit.trim())) {
            setErrorCuilCuit('El CUIL/CUIT debe tener el formato XX-XXXXXXXX-X (ej: 20-12345678-9).');
            return; 
        }
        // Validacion que tenga al menos un contacto
        if (dataForm.telefonos.length === 0) {
            toast.error('Debe agregar al menos un teléfono.')
            return;
        }

        if (dataForm.emails.length === 0) {
            toast.error('Debe agregar al menos un email.')
            return;
        }

        if (dataForm.direcciones.length === 0) {
            toast.error('Debe agregar al menos una dirección.')
            return;
        }

        const nombreCompleto = dataForm.nombreCompleto.trim();
        const parts = nombreCompleto.split(/\s+/).filter(p => p.length > 0);
        const nombre = parts[0] || '';
        const apellido = parts.slice(1).join(' ') || '.'; 
        let asociadoDeId = null;
        if (tipoPrestador === 'independiente' && dataForm.asociadoDe) {
            asociadoDeId = Number(dataForm.asociadoDe);
        }
        // Crear el cuerpo de la solicitud
        console.log(dataForm.direcciones)
        const bodyToSend = {
            cuilCuit: dataForm.cuilCuit,
            tipoPrestador: tipoPrestador === 'independiente' ? 'Independiente' : 'Centro Médico',
            asociadoDe: asociadoDeId,
            nombre: nombre,
            apellido: apellido,
            telefonos: dataForm.telefonos,
            emails: dataForm.emails,
            direcciones: dataForm.direcciones.map(d=>({...d, nro: Number(d.nro) ? d.nro : null })),
            especialidades: dataForm.especialidades 
        };

        try {
            const nuevoPrestador = await crearPrestador(bodyToSend); 
            toastConSubtitulo(
                "Prestador creado correctamente",
                "",
                "success",
                `/prestadores/modificar-prestador/${nuevoPrestador.prestadorId}`,
                navigate
            )
            navigate("/prestadores/gestionar");

        } catch (error) {
            toast.error('Hubo un error al crear el prestador.')
        }
};
    //Loader
    if(loadingDataForm){
        return(
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height:'20vh'}}>
                <LoaderConTexto text={'Cargando datos del formulario'} />
            </div>
        )
    }
    //En caso de error
    if(errorDataForm){
        return(
            <div className='error-message'>
                <SubTitleSection text={'No se pudo cargar los datos del formulario.'}/>
            </div>
        )
    }
    return (
        <form className="form-nuevo-prestador" onSubmit={handleSubmit}> 
            <SubTitleSection text={text} className="form-title" /> 
            <SubTitleSection text="Informacion basica" className="section-subtitle" />
            <div className="form-row basic-info">
                <InputText text="CUIL/CUIT"
                    name="cuilCuit"
                    value={dataForm.cuilCuit}
                    handleChange={handleChange} 
                    placeholder="XX-XXXXXXXX-X"
                    error={errorCuilCuit}
                />

                <InputText text="Nombre completo"
                    name="nombreCompleto"
                    placeholder='Centro Lionel Messi'
                    value={dataForm.nombreCompleto}
                    handleChange={handleChange}
                />
            </div>
            <SubTitleSection text="Tipo de prestador" />
            <div className="prestadores-checkbox-container">
                <div className="prestadores-checkbox-tipoIndependiente">
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
                        

            <SubTitleSection text="Especialidades" className="section-subtitle" />
            <div className='checkbox-container-nuevo-prestador'>
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
                    <InputText text="Calle"
                        name="calle"
                        value={currentDireccion.calle}
                        handleChange={handleChangeDireccion}
                        placeholder="Av. siempre viva"
                    /> 
                    <InputText text="Nro"
                        name="nro"
                        value={currentDireccion.nro}
                        handleChange={handleChangeDireccion}
                        placeholder="2020"
                        requerido={false}
                    />
                    <InputText text="Código Postal"
                        name="codigoPostal"
                        value={currentDireccion.codigoPostal}
                        handleChange={handleChangeDireccion}
                        placeholder="C1000AAB"
                    />
                    <AddButton onClick={addDireccion} className="button-add"/>
                </div>
                <div className="saved-items-container">
                        {dataForm.direcciones.map((dir, index) => (
                            <ContactCard 
                                key={`dir-${index}`} 
                                texto={dir} 
                                isDireccion={true} 
                                onDelete={() => removeDireccion(dir)}
                            />
                        ))}
                </div>
            </div>
            <div className="button-container">
                <Register onClick={handleSubmit} />
            </div>
        </form>
    );
}