import { DeleteIcon } from "../../../assets/icons/Afiliados/DeleteIcon";
import { InputSelect } from "../../../components/ui/Input/InputSelect/InputSelect";
import { InputDate } from "../../../components/ui/Input/InputDate/InputDate";
import {  useState } from "react";
import { AddMember } from "../../../components/ui/AddMember/AddMember";
import { RegisterGroup } from "../../../components/ui/RegisterGroup/RegisterGroup";
import "./CardModificarGrupo.css";
import { useDataFormAfiliados } from "../../../hooks/Formularios/useDataFormAfiliados";
import { useActualizarUnGrupo } from "../../../hooks/Afiliados/useActualizarGrupo";
import { LoaderConTexto } from '../../../components/LoaderConTexto/LoaderConTexto'
import { IconoEstado } from '../../../components/IconoEstado/IconoEstado'
import { validarFormularioActualizar } from "../../../validations/grupo/validarFormularioActualizar";
import { useDeleteGroup } from "../../../hooks/Afiliados/useDeleteGroup";
import { ModalDeConfirmacion } from '../../../components/ModalDeConfirmacion/ModalDeConfirmacion'
import { Tooltip } from "react-tooltip";
export function CardModificarGrupo({ grupo,setGrupoFamiliar }) {
  //Datos para el formulario
  const {datosParaFormulario} = useDataFormAfiliados()
  console.log(datosParaFormulario)
  const [dataForm, setDataForm] = useState({
    planId: grupo.planId,
    fechaAlta: grupo.fechaAlta,
    fechaBaja: grupo.fechaBaja
  });
  //Estado para mostrar la modal
  const [showModal, setShowModal] = useState(false)
  //Errores para los inputs
  const [errores, setErrores] = useState()
  //Hook para actualizar grupo
  const {loading, actualizarGrupo} = useActualizarUnGrupo(grupo.idGrupo,setDataForm,setGrupoFamiliar)
  //Hook para eliminar un grupo
  const {loadingDelete, deleteGroup} = useDeleteGroup(()=>{}) 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Control al enviar formulario
  const handleSubmit = ()=>{
    //Obtengo errores si hubiera
    const erroresObtenidos = validarFormularioActualizar(dataForm)
    //Verifico si me devolvió errores
    const hayErrores = Object.values(erroresObtenidos).some(value => value !== '')
    //Retorno en caso de errores
    if(hayErrores){
      setErrores(erroresObtenidos)
      return
    }

    //Ejecuto la funcion para actualizar
    actualizarGrupo(dataForm)
    setErrores({})
  }
  //Control para eliminar grupo
  const handleEliminar = (id)=>{
    setShowModal(false)
    deleteGroup(id)
  }

  //Retorno
  return (
    <section className="card_container_modificarGrupo box-border">
      {loading ||
        (loadingDelete && (
          <div className="container-loader-modificar-grupo">
            <LoaderConTexto
              text={loading ? "Actualizando.." : "Eliminando..."}
            />
          </div>
        ))}
      {showModal && (
        <ModalDeConfirmacion
          text={"¿Seguro que desea eliminar el grupo?"}
          funcionCancelar={() => setShowModal(false)}
          funcionConfirmar={() => handleEliminar(grupo.idGrupo)}
        />
      )}
      <div className="container_data_modificarGrupo">
        <div>
          <div
            style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}
          >
            <h1 className="titleGrupo">
              Grupo Familiar {grupo?.credencial} |{" "}
              {grupo?.integrantes.find((i) => i.esTitular)?.nombre}{" "}
              {grupo?.integrantes.find((i) => i.esTitular)?.apellido}
            </h1>
            <IconoEstado estado={grupo.esActivo} />
          </div>

          <p className="descriptionGrupo">
            Plan: {grupo?.planMedico?.descripcion} | Fecha Alta:{" "}
            {grupo?.fechaAlta}
          </p>
        </div>
        <div className="container_icons_cardModificarGrupo">
          <div
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
            data-tooltip-id={`eliminar-${grupo.idGrupo}4`}
            data-tooltip-content="Eliminar"
            className="cursor-help text-blue-600 font-medium"
          >
            <DeleteIcon></DeleteIcon>
            <Tooltip
              id={`eliminar-${grupo.idGrupo}4`}
              place="bottom"
              style={{
                whiteSpace: "pre-line",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container_form_modificarGrupo">
        <InputSelect
          text="Plan médico"
          name="planId"
          listaDeOpciones={datosParaFormulario?.planesMedicos}
          value={dataForm.planId}
          handleChange={handleChange}
        />
        <InputDate
          text="Fecha de Alta"
          name="fechaAlta"
          value={dataForm.fechaAlta}
          handleChange={handleChange}
          error={errores?.fechaAlta}
        />
        <InputDate
          text="Fecha de Baja"
          name="fechaBaja"
          value={dataForm.fechaBaja || ""}
          handleChange={handleChange}
          requerido={false}
          error={errores?.fechaBaja}
        />
      </div>
      <div className="container_botones_modificarGrupo">
        <AddMember idGrupo={grupo.idGrupo} />
        <div onClick={handleSubmit}>
          <RegisterGroup
            text={"Guardar Cambios"}
            disabled={huboCambios(grupo, dataForm)}
          />
        </div>
      </div>
    </section>
  );
}

const huboCambios = (grupo, data) => {
  return grupo.fechaAlta === data.fechaAlta && 
    grupo.fechaBaja ===data.fechaBaja &&
    grupo.planId === data.planId
}