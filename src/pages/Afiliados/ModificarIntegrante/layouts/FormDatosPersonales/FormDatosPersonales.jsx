import { useState } from "react";
import { InputSelect } from "../../../../../components/ui/Input/InputSelect/InputSelect";
import { InputText } from "../../../../../components/ui/Input/InputText/InputText";
import { InputDate } from '../../../../../components/ui/Input/InputDate/InputDate';
import { listaParentescos } from '../../../../../constants/listaParentescos'
import { TitleSection } from '../../../../../components/TitleSections/TitleSection';
import { RegisterGroup} from '../../../../../components/ui/RegisterGroup/RegisterGroup'
import './FormDatosPersonales.css'
import { validarFormularioAfiliadoActualizado } from '../../../../../validations/afiliados/validarFormularioAfiliadoActualizado';
import { useActualizarPersona } from '../../../../../hooks/Afiliados/useActualizarPersona';
import { ModalDeConfirmacion } from '../../../../../components/ModalDeConfirmacion/ModalDeConfirmacion'
import { LoaderConTexto } from '../../../../../components/LoaderConTexto/LoaderConTexto'
export function FormDatosPersonales({ data, datosParaFormulario, id,setPersona }) {
  const {loading, actualizarPersona} = useActualizarPersona(setPersona)
  //Errores
  const [errores,setErrores] = useState({})
  //Estado para las modales
  const [showModal,setShowModal] = useState(false)
  // Datos para el formulario
  const [dataForm, setDataForm] = useState({
    nombre: data.nombre,
    apellido: data.apellido,
    fechaAlta: data.fechaAlta,
    fechaBaja: data.fechaBaja,
    esTitular: data.esTitular,
    parentesco: data.parentesco,
    fechaNacimiento: data.fechaNacimiento,
    tipoDocId:data.tipoDocId,
    dni:data.dni
  });
  //Funcion para detectar cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //Funcion para al hacer click en guardar
  const handleClick = ()=>{
    setShowModal(false)
    const erroresAlValidar = validarFormularioAfiliadoActualizado(dataForm)
    const hayErrores = Object.values(erroresAlValidar).some(value => value !== '')
    const sonLosMismosFormularios = Object.keys(dataForm).every((key) => dataForm[key] === data[key]);
    if (hayErrores || sonLosMismosFormularios) {
      setErrores(erroresAlValidar)
      return
    }
    actualizarPersona(id,dataForm)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setShowModal(true)
  }
  // Retorno el componente
  return (
    <>
        {/* Mostrar modal */}
      {
        showModal &&
        <ModalDeConfirmacion 
          text={'¿Desea guardar los cambios?'}
          funcionCancelar={()=>setShowModal(false)}
          funcionConfirmar={handleClick}
        />
      }
      <form onSubmit={handleSubmit} className='section-modificar-integrante__container'>
        {/* Mostrar loader al enciar */}
        {
          loading &&
          <div style={{left:0, top:0, right:0,width:'100%', height:'100%', position:'absolute', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#6b8bac52 '}}>
            <LoaderConTexto text={'Guardando Cambios...'} />
          </div>
        }
        <div style={{margin:'-1rem', display:'flex', justifyContent:'center'}}>
          <TitleSection text={'Editar Datos Personales'} />
        </div>
        <div className="form-row centrar__inputs">
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
        </div>
        <div className='form-row centrar__inputs' >
          <InputText text="Nombres"
            name="nombre"
            value={dataForm.nombre}
            handleChange={handleChange}
            error={errores.nombre}
          />
          <InputText text="Apellidos"
            name="apellido"
            value={dataForm.apellido}
            handleChange={handleChange}
            error={errores.apellido}
          />
        </div>
        <div className="form-row centrar__inputs">
          
          <InputDate
            text="Fecha de nacimiento"
            name="fechaNacimiento"
            value={dataForm.fechaNacimiento}
            handleChange={handleChange}
            error={errores.fechaNacimiento}
          />
          {
            !data.esTitular && 
            <InputSelect text="Parentesco"
            name='parentesco'
            listaDeOpciones={listaParentescos}
            value={dataForm.parentesco}
            handleChange={handleChange} />
          }
          
        </div>
        <div className="form-row centrar__inputs">
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
        <div 
          style={{display:'flex', justifyContent:'flex-end'}}
        >
          <RegisterGroup text={'Guardar cambios'} onClick={handleSubmit}/>
        </div>
      </form>    
    </>

  );
}
