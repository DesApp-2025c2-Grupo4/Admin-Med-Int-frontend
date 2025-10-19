import { Link } from "react-router";
import { DeleteIcon } from "../../../../assets/icons/Afiliados/DeleteIcon";
import { ModifierIcon } from "../../../../assets/icons/Afiliados/ModifierIcon";
import { UsersIcon } from "../../../../assets/icons/Afiliados/UsersIcon";
import "./CardGrupo.css";
import { headerTableGrupoFamiliar } from "../../../../constants/Afiliados/Gestionar/headerTableGrupoFamiliar";
import { TableIntegrantes } from "./TableIntegrantes";
import { useState } from "react";
import { useDeleteGroup } from "../../../../hooks/Afiliados/useDeleteGroup";
import { Loader } from "../../../../components/Loader/Loader";
import { ModalDeConfirmacion } from '../../../../components/ModalDeConfirmacion/ModalDeConfirmacion'
import { AddMemberIcon } from "../../../../assets/icons/Afiliados/AddMemberIcon";
import { Tooltip } from "react-tooltip";
import { IconoEstado } from "../../../../components/IconoEstado/IconoEstado";
export function CardGrupo({
  idGrupo,
  credencial,
  nombre,
  apellido,
  fechaAlta,
  planMedico,
  integrantes,
  setAllGrupos,
  esActivo
}) {
  console.log(esActivo)
  // 
  const {loadingDelete, error, deleteGroup} = useDeleteGroup({setAllGrupos})

  // Estados para mostrar modal
  const [showModal, setShowModal] = useState(false)
  
  // Funcion para mostrar modal
  const handleClickDelete = (funcionEliminar)=>{
    setShowModal(!showModal)
    funcionEliminar()
  }
  // Funcion y estados para mostrar listado 
  const  [contraer, setContraer] = useState(false) 

  const modificarCard = () => {
    setContraer(!contraer);
  };


  // Retorno
  return (
    <>
      {/* Funcion para mostrar la modal al eliminar */}
      {
        showModal && 
        <ModalDeConfirmacion 
          text='¿Seguro que deseas eliminar el grupo?'
          funcionConfirmar={()=>handleClickDelete(()=>deleteGroup(idGrupo))}
          funcionCancelar={()=>setShowModal(!showModal)}  
        />
      }
      {/* Funcion de estado de eliminacion */}
      
      {

      }
      {/* Retorno de seccion de la card */}
      <section
        className={`card_container box-border`}
        style={
          { paddingBottom: contraer ? "1rem" : "0",
            backgroundColor: showModal ? '#0c243d56':'white'
          }
        }
      >
        {
          loadingDelete && 
          <div className="cotainer-loader-card">
            <Loader />  
          </div>
        }
        <article
          className="container-header__Card"
        >
          <div className="container_data">
            <h1 className="titleGrupo">
              Grupo Familiar {credencial} | {nombre} {apellido}
            </h1>
            <p className="descriptionGrupo">
              Plan: {planMedico} | Fecha Alta: {fechaAlta}
            </p>
          </div>
          <IconoEstado estado={esActivo}/>
        </article>
        

        {/* BOTONES DE CARD DE GRUPO */}

        <div className="container_icons">
          <BotonEliminarGrupo id={idGrupo} funcion={()=>setShowModal(!showModal)} credencial={credencial}/>
          <BotonDesplegarIntegrantes id={idGrupo} funcion={modificarCard} credencial={credencial}/>
          <BotonEditarGrupo id={idGrupo} credencial={credencial}/>
          <BotonAgregarIntegrante id={idGrupo} credencial={credencial}/>
        </div>

        {/* TABLA DE INTEGRANTES */}

        <div
          className={`container_tableIntegrantes ${contraer ? "contraer" : ""}`}
        >
          <TableIntegrantes
            loadingGrupos={false}
            listHeader={headerTableGrupoFamiliar}
            data={integrantes}
          ></TableIntegrantes>
        </div>
      </section>
    </>
  );
}

//Botones de Card
const BotonDesplegarIntegrantes = ({id,funcion,credencial})=>{
  return(
    <div 
      onClick={funcion} 
      style={{ cursor: "pointer" }}
      data-tooltip-id={`tooltip-${credencial}`}
      data-tooltip-content='Desplegar'
      className="cursor-help text-blue-600 font-medium" 
    >
      <UsersIcon />
      <Tooltip 
          id={`tooltip-${credencial}`}
          place="top"
          style={{
            whiteSpace: "pre-line",
          }}
      />
    </div>
  )
}
const BotonAgregarIntegrante=({id,credencial})=>{
  return(
    <Link 
      to={`/afiliados/agregar-integrante/${id}`}
      data-tooltip-id={`tooltip-${credencial}`}
      data-tooltip-content='Agregar Integrante'
      className="cursor-help text-blue-600 font-medium"      
    >
      <AddMemberIcon />
      <Tooltip 
          id={`tooltip-${credencial}`}
          place="top"
          style={{
            whiteSpace: "pre-line",
          }}
      />
    </Link>
  )
}
const BotonEliminarGrupo =({id,funcion,credencial})=>{
  return(
    <Link 
      onClick={funcion}
      data-tooltip-id={`tooltip-${credencial}`}
      data-tooltip-content='Eliminar Grupo'
      className="cursor-help text-blue-600 font-medium"
      >
      <DeleteIcon></DeleteIcon>
      <Tooltip 
          id={`tooltip-${credencial}`}
          place="top"
          style={{
            whiteSpace: "pre-line",
          }}
      />
    </Link>
  )
}
const BotonEditarGrupo = ({id,credencial})=>{
  return(
    <>
      <Link 
        to={"/afiliados/gestionar/modificar-grupo-familiar/" + id}
        data-tooltip-id={`tooltip-${credencial}`}
        data-tooltip-content='Editar Grupo'
        className="cursor-help text-blue-600 font-medium"
      >
        <ModifierIcon></ModifierIcon>
        <Tooltip 
          id={`tooltip-${credencial}`}
          place="top"
          style={{
            whiteSpace: "pre-line",
          }}
      />
      </Link>
    </>
  )
}
