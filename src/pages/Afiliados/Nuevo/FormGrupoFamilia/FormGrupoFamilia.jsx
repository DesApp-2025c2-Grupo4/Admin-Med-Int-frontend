import './FormGrupoFamilia.css'
import { useState } from 'react'
import { InputText } from "../../../../components/ui/Input/InputText/InputText.jsx"
import { InputSelect } from "../../../../components/ui/Input/InputSelect/InputSelect.jsx"
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import { SubTitleSection } from "../../../../components/ui/SubTitleSection/SubTitleSection.jsx"
import { AddButton } from "../../../../components/ui/AddButton/AddButton.jsx"
import { SituacionCard } from '../../../../components/ui/Cards/SituacionCard/SituacionCard.jsx'
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx'
import { BotonCancelar } from '../../../../components/ui/CancelarBoton/BotonCancelar.jsx'
import { useDataFormAfiliados } from '../../../../hooks/Formularios/useDataFormAfiliados.jsx'
import { validarNumeroDeTelefono } from '../../../../validations/validarNumeroDeTelefono.js'
import { validarEmail } from '../../../../validations/validarEmail.js'
import { validarDireccion } from '../../../../validations/validarDireccion.js'
import { formatearTelefono } from '../../../../utils/formatearNumeroDeTelefono.js'
import { validarFormulario } from '../../../../validations/validarFormulario.js'
import { LoaderConTexto } from '../../../../components/LoaderConTexto/LoaderConTexto.jsx'
import { useCambiarTitulo } from "../../../../hooks/useCambiarTitulo.jsx";
import { toastConSubtitulo} from '../../../../components/ToastConSubtitulo/ToastConSubtitulo.jsx'

export function FormGrupoFamilia({ text, component, funcionSubmit }) {
  useCambiarTitulo({ title: "Nuevo Afiliado" });
  // OBTENGO DATOS DEL FORMULARIO
  const { loadingDataForm, datosParaFormulario } = useDataFormAfiliados()
  const ButtonComponent = component

  const [newSituacion, setNewSituacion] = useState("1")
  const [isIndefinida, setIsIndefinida] = useState(false)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [currentTelefono, setCurrentTelefono] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentDireccion, setCurrentDireccion] = useState({
    calle:'',
    nro:''
  })
  const [tieneSituacion, setTieneSituacion] = useState(false)

  const [errores, setErrores] = useState()

  const hoy = new Date();
  const dia = hoy.getUTCDate().toString().padStart(2, '0');
  const mes = (hoy.getUTCMonth() + 1).toString().padStart(2, '0'); 
  const anio = hoy.getUTCFullYear();
  const fechaHoy = `${anio}-${mes}-${dia}`;

  const [dataForm, setDataForm] = useState({
    nombre: '',
    apellido: '',
    tipoDocId: 1,
    dni: '',
    planId: 1,
    fechaNacimiento: '',
    telefonos: [],
    emails: [],
    direcciones: [],
    situacionesTerapeuticas: [],
    parentensco: 'Titular',
    fechaAlta: fechaHoy,
    fechaBaja: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDeleteItem = (listName, itemToDelete) => {
    const normalizedItemToDelete = itemToDelete.trim().toUpperCase()
    setDataForm(prev => ({
      ...prev,
      [listName]: prev[listName].filter(item => item.trim().toUpperCase() !== normalizedItemToDelete)
    }))
  }

  const deleteTelefono = (telefono) => handleDeleteItem('telefonos', telefono)
  const deleteEmail = (email) => handleDeleteItem('emails', email)
  const deleteDireccion = (direccion) => {
    const calleDireccion = direccion.calle
    const nroDireccion = direccion.nro
    setDataForm(prev => ({
      ...prev,
      direcciones: prev.direcciones.filter(
        d => d.calle !== calleDireccion || d.nro !== nroDireccion
      )
    }))
  }
  const deleteSituacion = (id) => {
    setDataForm(prev => ({
      ...prev,
      situacionesTerapeuticas: prev.situacionesTerapeuticas.filter(s => s.situacionId !== id)
    }))
  }

  const addTelefono = () => {
    setErrores(prev => ({ ...prev, telefonos: '' }))
    const telefonoLimpio = currentTelefono.trim()
    const errorDeTelefono = validarNumeroDeTelefono(telefonoLimpio, dataForm.telefonos)
    if (errorDeTelefono) {
      setErrores(prev => ({ ...prev, telefonos: errorDeTelefono }))
      return
    }
    setDataForm(prev => ({ ...prev, telefonos: [...prev.telefonos, telefonoLimpio] }))
    setCurrentTelefono('')
  }

  const addEmail = () => {
    setErrores(prev => ({ ...prev, emails: '' }))
    const emailLimpio = currentEmail.trim().toUpperCase()
    const errorEmail = validarEmail(emailLimpio, dataForm.emails)
    if (errorEmail) {
      setErrores(prev => ({ ...prev, emails: errorEmail }))
      return
    }
    setDataForm(prev => ({ ...prev, emails: [...prev.emails, currentEmail.trim()] }))
    setCurrentEmail('')
  }

  const addDireccion = () => {
    setErrores(prev => ({ ...prev, direcciones: '' }))
    const erroresDeDirecciones = validarDireccion(currentDireccion, dataForm.direcciones)
    if (erroresDeDirecciones.nro || erroresDeDirecciones.calle) {
      setErrores(prev => ({ ...prev, direcciones: erroresDeDirecciones }))
      return
    }
    const direccionAAgregar = {
      ... currentDireccion,
      nro: currentDireccion.nro.trim() === '' ? null : currentDireccion.nro
    }
    setDataForm(prev => ({
      ...prev,
      direcciones: [...prev.direcciones, direccionAAgregar],
    }))
    setCurrentDireccion({
    calle:'',
    nro:''
  })
  }

  const addSituacion = () => {
    if (!newSituacion) return
    const situacionSeleccionada = datosParaFormulario?.situacionesTerapeuticas?.find(
      s => s.id === parseInt(newSituacion, 10)
    )
    if (!situacionSeleccionada) return

    const isCronica = !isIndefinida
    if (!isCronica && (!fechaInicio || !fechaFin)) return

    const isDuplicada = dataForm.situacionesTerapeuticas.some(
      s => s.situacionId === situacionSeleccionada.id
    )
    if (isDuplicada) return

    const newSituacionObject = {
      situacionId: situacionSeleccionada.id,
      descripcion: situacionSeleccionada.descripcion,
      esCronica: isCronica,
      fechaInicio: isCronica ? null : fechaInicio,
      fechaFin: isCronica ? null : fechaFin
    }
    setDataForm(prev => ({
      ...prev,
      situacionesTerapeuticas: [...prev.situacionesTerapeuticas, newSituacionObject]
    }))
    setFechaInicio('')
    setFechaFin('')
  }

  const handleSituacionTypeChange = (e) => {
    setIsIndefinida(e.target.value === 'indefinida')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresDeFormulario = validarFormulario(dataForm)
    // Si hay al menos un error (valor distinto de null), se detiene el submit
    const hayErrores = Object.values(erroresDeFormulario).some(value => value !== '')
    
    if (hayErrores) {
      setErrores(erroresDeFormulario)
      toastConSubtitulo(
        'Formulario incompleto',
        'Completá todos los campos requeridos',
        'error'
      )
      return
    }
    funcionSubmit(dataForm)
  }

  if(loadingDataForm){
    return(
      <div className="contendor_loader-detalle">
        <LoaderConTexto text={'Cargando formulario.'}/>
      </div>
    )
    
  }
  if (!loadingDataForm && !datosParaFormulario?.tiposDeDocumentos || !datosParaFormulario?.situacionesTerapeuticas || !datosParaFormulario?.planesMedicos) {
    return (
      <div className="sin-resultados-section">
        <SubTitleSection text={"No se pudieron cargar los datos del formulario."} />
      </div>
    );
  }

  return (
    <form className="form-grupo-familia" onSubmit={handleSubmit}>
      <SubTitleSection text={text} />

      <div className="form-row">
        <InputSelect
          text="Tipo de documento"
          name='tipoDocId'
          listaDeOpciones={datosParaFormulario.tiposDeDocumentos}
          handleChange={handleChange}
          value={dataForm.tipoDocId} />
        <InputText
          text="Numero de documento"
          name="dni"
          value={dataForm.dni}
          handleChange={handleChange}
          error={errores?.dni} />
        <InputText
          text="Nombres"
          name="nombre"
          value={dataForm.nombre}
          handleChange={handleChange}
          error={errores?.nombre} />
      </div>

      <div className="form-row">
        <InputText
          text="Apellidos"
          name="apellido"
          value={dataForm.apellido}
          handleChange={handleChange}
          error={errores?.apellido} />
        <InputDate
          text="Fecha de nacimiento"
          name="fechaNacimiento"
          value={dataForm.fechaNacimiento}
          handleChange={handleChange}
          error={errores?.fechaNacimiento} />
        <InputSelect
          text="Plan medico"
          name='planId'
          listaDeOpciones={datosParaFormulario.planesMedicos}
          value={dataForm.planId}
          handleChange={handleChange} />
      </div>

      <SubTitleSection text="Información de Ingreso" />
      <div className="form-row">
        <InputDate
          text="Fecha de Alta"
          name="fechaAlta"
          value={dataForm.fechaAlta}
          handleChange={handleChange}
          error={errores?.fechaAlta} />
        <InputDate
          text="Fecha de Baja"
          name="fechaBaja"
          value={dataForm.fechaBaja}
          handleChange={handleChange}
          requerido={false}
          error={errores?.fechaBaja} />
      </div>

      <SubTitleSection text="Información de contacto" />
      <div className="form-contacto">
        <div className="input-with-button">
          <InputText
            text="Teléfono"
            name="telefonos"
            value={currentTelefono}
            handleChange={(e) => setCurrentTelefono(e.target.value)}
            error={errores?.telefonos} />
          <div style={{paddingTop:'1rem'}}>
            <AddButton onClick={addTelefono} />
          </div>
          <div className="saved-items-container">
            {dataForm.telefonos.map((tel, index) => (
              <ContactCard
                key={`tel-${index}`}
                texto={formatearTelefono(tel)}
                onDelete={() => deleteTelefono(tel)} />
            ))}
          </div>
        </div>
        
        <div className="input-with-button">
          <InputText
            text="Email"
            name="emails"
            value={currentEmail}
            handleChange={(e) => setCurrentEmail(e.target.value)}
            error={errores?.emails} />
          <div style={{paddingTop:'1rem'}}>
            <AddButton onClick={addEmail} className="button-add" />
          </div>
          <div className="saved-items-container">
            {dataForm.emails.map((email, index) => (
              <ContactCard
                key={`email-${index}`}
                texto={email}
                onDelete={() => deleteEmail(email)} />
            ))}
          </div>
        </div>

      </div>
      {/* DIRECCIONES */}
        <SubTitleSection text="Dirección" />
        <div className="form-contacto">
          <div className="input-with-button">
            <InputText text="Calle"
              name="calle"
              value={currentDireccion.calle}
              handleChange={(e) => setCurrentDireccion(prev => ({
                ...prev, [e.target.name] : e.target.value
              }))}
              error={errores?.direcciones?.calle || errores?.direcciones}
            />
            <InputText
              text='N° Calle'
              name='nro'
              value={currentDireccion.nro}
              handleChange={(e) => setCurrentDireccion(prev => ({
                ...prev, [e.target.name] : e.target.value
              }))}
              error={errores?.direcciones?.nro}
              requerido={false}
            />
            <div style={{paddingTop:'1rem'}}>
              <AddButton onClick={addDireccion} className="button-add" />
            </div>
            <div className="saved-items-container">
              {dataForm.direcciones.map((dir, index) => (
                <ContactCard
                  key={`dir-${index}`}
                  texto={dir}
                  onDelete={() => deleteDireccion(dir)}
                  isDireccion={true}
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
              listaDeOpciones={datosParaFormulario.situacionesTerapeuticas}
              value={newSituacion}
              handleChange={(e) => setNewSituacion(e.target.value)}
              requerido={false} />

            <div className="radio-group-and-calendars">
              <div className="checkbox-group">
                <div className='checkbox-items'>
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
                onDelete={() => deleteSituacion(s.situacionId)} />
            ))}
          </div>
        </div>
      )}

      <div className="buttons-container__form">
        <BotonCancelar path={'/afiliados/gestionar'} />
        <div onClick={handleSubmit} style={{ cursor: 'pointer' }}>
          <ButtonComponent text='Registrar Grupo' />
        </div>
      </div>
    </form>
  )
}
