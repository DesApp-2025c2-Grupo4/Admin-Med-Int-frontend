import { InputText } from '../../../../components/ui/Input/InputText/InputText.jsx'
import { InputSelect } from '../../../../components/ui/Input/InputSelect/InputSelect.jsx'
import { SubTitleSection } from '../../../../components/ui/SubTitleSection/SubTitleSection.jsx'
import { AddButton } from '../../../../components/ui/AddButton/AddButton.jsx'
import { InputDate } from '../../../../components/ui/Input/InputDate/InputDate.jsx'
import { useState } from 'react'
import { SituacionCard } from '../../../../components/ui/Cards/SituacionCard/SituacionCard.jsx'
import { ContactCard } from '../../../../components/ui/Cards/ContactCard/ContactCard.jsx'
import { useParams } from 'react-router'
import { listaParentescos } from '../../../../constants/listaParentescos.js'
import { useCrearIntegrante } from '../../../../hooks/Afiliados/useCrearIntegrante.jsx'
import { LoaderConTexto } from '../../../../components/LoaderConTexto/LoaderConTexto.jsx'
import { useDataFormAfiliados } from '../../../../hooks/Formularios/useDataFormAfiliados.jsx'
import { formularioCrearIntegrantesSchema } from '../../../../validations/formularioCrearIntegranteSchema.js'
import { validarNumeroDeTelefono } from '../../../../validations/validarNumeroDeTelefono.js'
import { validarEmail } from '../../../../validations/validarEmail.js'
import { validarDireccion } from '../../../../validations/validarDireccion.js'
import { BotonCancelar } from '../../../../components/ui/CancelarBoton/BotonCancelar.jsx'
import { RegisterGroup } from '../../../../components/ui/RegisterGroup/RegisterGroup.jsx'
import { formatearTelefono } from '../../../../utils/formatearNumeroDeTelefono.js'
import { validarFormulario } from '../../../../validations/validarFormulario.js'

export function FormAgregarIntegrante({ grupo }) {
  const { error, data, loading, crearUnIntegrante } = useCrearIntegrante()
  const { datosParaFormulario } = useDataFormAfiliados()
  const { id } = useParams()
  const [newSituacion, setNewSituacion] = useState("1")
  const [isIndefinida, setIsIndefinida] = useState(false)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [currentTelefono, setCurrentTelefono] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [currentDireccion, setCurrentDireccion] = useState('')
  const [tieneSituacion, setTieneSituacion] = useState(false)
  //Errores
  const [errores, setErrores] = useState({})

  const [dataForm, setDataForm] = useState({
    idGrupo: id,
    nombre: '',
    apellido: '',
    tipoDocId: 1,
    dni: '',
    fechaNacimiento: '',
    telefonos: [],
    emails: [],
    direcciones: [],
    situacionesTerapeuticas: [],
    parentesco: listaParentescos[0],
    fechaAlta: new Date().toISOString().split('T')[0],
    fechaBaja: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDeleteItem = (listName, itemToDelete) => {
    const normalizedItemToDelete = itemToDelete.trim().toUpperCase()
    setDataForm(prev => ({
      ...prev,
      [listName]: prev[listName].filter(item =>
        item.trim().toUpperCase() !== normalizedItemToDelete
      ),
    }))
  }

  const deleteTelefono = (telefono) => handleDeleteItem('telefonos', telefono)
  const deleteEmail = (email) => handleDeleteItem('emails', email)
  const deleteDireccion = (direccion) => handleDeleteItem('direcciones', direccion)
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
    setDataForm(prev => ({
      ...prev,
      telefonos: [...prev.telefonos, telefonoLimpio],
    }))
    setCurrentTelefono('')
  }

  const addEmail = () => {
    setErrores(prev=>({...prev, emails:''}))
    setErrores(prev => ({ ...prev, emails: '' }))
    const emailLimpio = currentEmail.trim().toUpperCase()
    const errorEmail = validarEmail(emailLimpio, dataForm.emails)
    if (errorEmail) {
      setErrores(prev => ({ ...prev, emails: errorEmail }))
      return
    }
    setDataForm(prev => ({
      ...prev,
      emails: [...prev.emails, currentEmail.trim()],
    }))
    setCurrentEmail('')
  }

  const addDireccion = () => {
    setErrores(prev => ({ ...prev, direcciones: '' }))
    const direccionLimpia = currentDireccion.trim().toUpperCase()
    const erroresDeDirecciones = validarDireccion(direccionLimpia, dataForm.direcciones)
    if (erroresDeDirecciones) {
      setErrores(prev => ({ ...prev, direcciones: erroresDeDirecciones }))
      return
    }
    setDataForm(prev => ({
      ...prev,
      direcciones: [...prev.direcciones, currentDireccion.trim()],
    }))
    setCurrentDireccion('')
  }

  const addSituacion = () => {
    if (newSituacion === "" || newSituacion === null) return

    const situacionSeleccionada = datosParaFormulario?.situacionesTerapeuticas?.find(
      (s) => s.id === parseInt(newSituacion, 10)
    )
    if (!situacionSeleccionada) return

    const isCronica = !isIndefinida
    if (!isCronica && (!fechaInicio || !fechaFin)) return

    const isDuplicada = dataForm.situacionesTerapeuticas.some(
      (s) => s.situacionId === situacionSeleccionada.id
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
      situacionesTerapeuticas: [
        ...prev.situacionesTerapeuticas,
        newSituacionObject,
      ],
    }))
    setFechaInicio('')
    setFechaFin('')
  }

  const handleSituacionTypeChange = (e) => {
    const isIndefinidaSelected = e.target.value === 'indefinida'
    setIsIndefinida(isIndefinidaSelected)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const erroresDeFormulario = validarFormulario(dataForm, grupo)
    console.log(erroresDeFormulario)
    
    // Si hay al menos un error (valor distinto de null), se detiene el submit
    const hayErrores = Object.values(erroresDeFormulario).some(value => value !== null)
    
    if (hayErrores) {
      setErrores(erroresDeFormulario)
      return
    }

    // Si no hay errores, se procede
    crearUnIntegrante(dataForm)
  }

  if (!datosParaFormulario?.tiposDeDocumentos || !datosParaFormulario?.situacionesTerapeuticas || !datosParaFormulario?.planesMedicos) {
    return <h2>No se pudieron cargar los datos para el formulario</h2>
  }

  return (
    <>
      {loading &&
        <div className="conteiner-loader-formulario">
          <LoaderConTexto text={'Enviando Formulario'} />
        </div>
      }
      <form className="form-grupo-familia" onSubmit={handleSubmit}>
        <SubTitleSection text={'Datos Principales'} />
        <div className="form-row">
          <InputSelect
            text="Tipo de documento"
            name='tipoDocId'
            listaDeOpciones={datosParaFormulario.tiposDeDocumentos}
            handleChange={handleChange}
            value={dataForm.tipoDocId} />
          <InputText text="Numero de documento"
            name="dni"
            value={dataForm.dni}
            handleChange={handleChange}
            error={errores.dni}
          />
          <InputText text="Nombres"
            name="nombre"
            value={dataForm.nombre}
            handleChange={handleChange}
            error={errores.nombre}
          />
        </div>

        <div className="form-row">
          <InputText text="Apellidos"
            name="apellido"
            value={dataForm.apellido}
            handleChange={handleChange}
            error={errores.apellido}
          />
          <InputDate
            text="Fecha de nacimiento"
            name="fechaNacimiento"
            value={dataForm.fechaNacimiento}
            handleChange={handleChange}
            error={errores.fechaNacimiento}
          />
          <InputSelect text="Parentesco"
            name='parentesco'
            listaDeOpciones={listaParentescos}
            value={dataForm.parentesco}
            handleChange={handleChange} />
        </div>

        <SubTitleSection text="Información de Ingreso" />
        <div className="form-row">
          <InputDate
            text="Fecha de Alta"
            name="fechaAlta"
            value={dataForm.fechaAlta}
            handleChange={handleChange}
            error={errores.fechaAlta}
          />
          <InputDate
            text="Fecha de Baja"
            name="fechaBaja"
            value={dataForm.fechaBaja}
            handleChange={handleChange}
            requerido={false}
            error={errores.fechaBaja}
          />
        </div>

        <SubTitleSection text="Información de contacto" />
        <div className="form-contacto">
          {/* TELÉFONOS */}
          <div className="input-with-button">
            <InputText text="Teléfono"
              name="telefonos"
              value={currentTelefono}
              handleChange={(e) => setCurrentTelefono(e.target.value)}
              error={errores.telefonos }
            />
            <AddButton onClick={addTelefono} />
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
              handleChange={(e) => setCurrentEmail(e.target.value)}
              error={errores.emails}
            />
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
              handleChange={(e) => setCurrentDireccion(e.target.value)}
              error={errores.direcciones }
            />
            <AddButton onClick={addDireccion} className="button-add" />
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
                listaDeOpciones={datosParaFormulario.situacionesTerapeuticas}
                value={newSituacion}
                handleChange={(e) => setNewSituacion(e.target.value)}
                requerido={false}
              />

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
                  onDelete={() => deleteSituacion(s.situacionId)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="button-container">
          <BotonCancelar path={'/afiliados/gestionar'} />
          <div onClick={handleSubmit} style={{ cursor: 'pointer' }}>
            <RegisterGroup text='Registrar Integrante' />
          </div>
        </div>
      </form>
    </>
  )
}
